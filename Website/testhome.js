
document.body.style.backgroundImage = "url('bgPlant.jpg')";

function myFunction() {
  var popup = document.getElementById("myPopup") ;
  popup.classList.toggle("show");
}

function getValue( ){
    for(var i=0;i<101;i++){
      return i;
    }
}

function circleColor(){
  var x = getValue();
  document.getElementById("num").innerHTML= x;
}

setInterval(circleColor(),1000);
