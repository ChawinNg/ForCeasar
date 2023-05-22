// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart', 'table', 'sankey']});

// Set a callback to run when the Google Visualization API is loaded.

google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}

function getTime(){
  const d = new Date();
let h = addZero(d.getHours());
let m = addZero(d.getMinutes());
let s = addZero(d.getSeconds());
let time = h + ":" + m + ":" + s;
return time
}

let Threshold=3;

var data_array=[
      ['Time', 'Humidity'],
      [getTime(), 0]
    ]

var options = {
    
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Time',
      logScale: false
    },
    vAxis: {
      title: 'Humidity',
      logScale: false
    },
    
};

function drawChart() {
    var data = google.visualization.arrayToDataTable(data_array);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
    chart.draw(data, options);
}

function loadData() {
  // fetch("http://192.168.43.154/history")
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res.humidity);
  //       for (let i = res.humidity.length - 1; i >= 0; i--) {
  //         addData(res.humidity[i]);
  //       }
  //     });

  setInterval(() => {
    fetch("http://192.168.43.154/")
        .then(res => res.json())
        .then(res => {
            addData(res.humidity);
        });
  }, 1000);
}

function addData(Humidity){
let size=data_array.length


  if(size<10){
      data_array.push([getTime(),Humidity])
  }
  else{
    console.log(6553)
    for(let i=1;i<size-1;i++){
      data_array[i]=data_array[i+1]
    }
    data_array[size-1]=[getTime(),Humidity]
    
  }
  drawChart()

}

function getcurrentHumidity(){
  document.querySelector('h2').innerText=(data_array[data_array.length-1][1]-1)+'%'
  
}



