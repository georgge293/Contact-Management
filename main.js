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

        $.getJSON({
          url: "https://api.github.com/users/"+data[i].login,
          async: false,
          success: function(content){
            if(content.company == null){
              htmlStr +="<td></td>";
            }
            else{
              htmlStr+= "<td>"+ content.company + "</td>";
            }
            if(content.location == null){
              htmlStr += "<td></td>";
            }
            else {
              htmlStr += "<td>" + content.location + "</td>";
            }
            if(content.email == null){
              htmlStr += "<td></td><td class = 'invis'><button onClick = editProfile(" + i + ")>Edit Profile</button></td></tr></tbody>";
            }
            else{
              htmlStr += "<td>" + content.email + "</td><td><button></button></td></tr></tbody>";
            }
          },
          fail: function(){
            alert("error");
          }
        });
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
  var table, rows, switching, i, x, y, shouldSwitch, column;
  table = document.getElementById("myTable");
  switching = true;
  if(sortType == 1 || sortType == 2){
    column = 1;
  }
  else{
    column = 3;
  }
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      if(sortType == 1 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
        shouldSwitch = true;
        break;
      }
      else if(sortType == 2 && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
      else if(sortType == 3 && parseInt(x.innerHTML) < parseInt(y.innerHTML)){
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
//part 5
function editProfile(i){

}
