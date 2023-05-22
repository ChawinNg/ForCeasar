function myFunction() {
    var popup = document.getElementById("myPopup") ;
    popup.classList.toggle("show");
  }
  
  async function circlePercent(){
    fetch("http://192.168.43.154/")
      .then(res => res.json())
      .then(res => {
        document.getElementById("num").innerHTML= res.humidity+"%";
      });
  }
  
  setInterval(circlePercent, 1000);

