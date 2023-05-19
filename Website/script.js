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
      ['Time', 'Humidity','Threshold'],
      [getTime(),1,Threshold]
    ]

var options = {
    title: 'HUMIDITY vs TIME',
    curveType: 'function',
    legend: { position: 'bottom' },
    
};

function drawChart() {
    var data = google.visualization.arrayToDataTable(data_array);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    // var chart2 = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);

    // chart2.draw(data, options);

}



function addData(){
let size=data_array.length
  let Humidity=Math.random()*10;


  if(size<10){
      data_array.push([getTime(),Humidity,Threshold])
  }
  else{
    console.log(6553)
    for(let i=1;i<size-1;i++){
      data_array[i]=data_array[i+1]
    }
    data_array[size-1]=[getTime(),Humidity,Threshold]
    
  }
  drawChart()

}



