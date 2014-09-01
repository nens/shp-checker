// index.js

var shp = require('shpjs'),
    shapeElement = document.getElementById("shapefile"),
    iniElement = document.getElementById("ini");

var columns = {};

function newElem (elem, type) {
  var thisRow = document.createElement(type);
  return elem.appendChild(thisRow);
} 

function showCards (geojson) {
  var hRow;
  var tbody = document.getElementById('table-body');
  for (var i = 0; 50 > i; i++) {
    var feature = geojson.features[i];
    if (i === 0) {
      var thead = document.getElementById('table-head');
      hRow = newElem(thead, 'tr');
    }
    var newRow = newElem(table, 'tr');
    for (j in columns) {
      if (i === 0) {
        var tH = newElem(hRow, 'th');
        tH.innerHTML = j;
      }
      var newTd = newElem(newRow, 'td');
      newTd.innerHTML = feature.properties[columns[j]];
    }
  }
}

shapeElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  var fileList = this.files; /* now you can work with the file list */
  var reader = new FileReader();
  reader.onloadend = function (progress, buff) {

    var zip = shp.parseZip(this.result);
    showCards(zip);
    // shp(this.result).then(showCards);
  };
  reader.readAsArrayBuffer(this.files[0]);

};

iniElement.addEventListener("change", handleIniFiles, false);
function handleIniFiles() {
  var fileList = this.files; /* now you can work with the file list */
  var reader = new FileReader();
  reader.onloadend = function (progress, buff) {
    // console.log(buff, this.result);
    
    var lines = this.result.split('[columns]')[1].split('\n').slice(1, -1);
    for (var i = 0; lines.length > i; i++) {
      kvPair = lines[i].split(' = ');
      columns[kvPair[0].toLowerCase()] = kvPair[1].toLowerCase();
    }
    document.getElementById('shapefile-input').classList.remove('hidden');
  };
  reader.readAsText(this.files[0]);

};