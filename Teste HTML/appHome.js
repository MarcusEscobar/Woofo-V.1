
var hidePage = document.getElementById("formPost");
var hideHomePage = document.getElementById("homeid");
var hidePostBtn = document.getElementById("btn_post");
hidePage.style.display="none";

function ocultarpage(){
  hidePage.style.display="";
  hideHomePage.style.display="none"
  hidePostBtn.style.display="none"
  console.log('apertou botão');
}
function referesh(){
  location.reload()
}