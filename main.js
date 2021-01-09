//Step 1 LOADING DATA FROM GIT LINK
$.getJSON({
  url: "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors",

  success: function(data){
    let htmlStr = "<tbody>";
    for(let i=0; i < data.length; i++){
      if(data[i].contributions > 10){
        htmlStr += "<tr class = 'gold'>";
      }
      else if(data[i].contributions > 5){
        htmlStr += "<tr class = 'silver'>";
      }
      else{
        htmlStr += "<tr class = 'bronze'>";
      }
        htmlStr += "<td><img src =" + data[i].avatar_url + " alt = 'Avatar'></td>" +
        "<td>" + data[i].login + "</td>" +
        "<td>" + data[i].id + "</td>" +
        "<td>" + data[i].contributions + "</td>";

        htmlStr += "</tr></tbody>";
    }
    $("table").append(htmlStr);
  },
  fail: function(){
    alert("error");
  }
});



//Step 2 SPLITING CONTACTS INTO GROUPS
function displayGold() {
  var arrayOfElements = document.getElementsByClassName('gold');
  display(arrayOfElements);
}
function displaySilver() {
  var arrayOfElements = document.getElementsByClassName('silver');
  display(arrayOfElements);
}
function displayBronze() {
  var arrayOfElements = document.getElementsByClassName('bronze');
  display(arrayOfElements);
}
function display(arrayOfElements){
  var lengthOfArray = arrayOfElements.length;
  for (var i = 0; i < lengthOfArray; i++){
    if (arrayOfElements[i].style.display === "none") {
      arrayOfElements[i].style.display = "";
    } else {
      arrayOfElements[i].style.display = "none";
    }
  }
}
//Step 3
function sort(sortType){
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if(sortType == 1 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
        shouldSwitch = true;
        break;
      }
      else if(sortType == 2 && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function defaultOrder(){
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
