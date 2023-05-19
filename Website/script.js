// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart', 'table', 'sankey']});

// Set a callback to run when the Google Visualization API is loaded.

google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
var data_array=[
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]


var options = {
    title: 'HUMIDITY vs TIME',
    curveType: 'function',
    legend: { position: 'bottom' },
    width:900,
    height:300,
    animation: {"startup": true}
};
function drawChart() {
    var data = google.visualization.arrayToDataTable(data_array);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);

    google.visualization.events.addListener(chart, 'select', selectHandler);


}

function selectHandler(e) {
  alert('A table row was selected');
}

function addData(){
  let size=data_array.length;
  for(let i=1;i<size-1;i++){
    data_array[i]=data_array[i+1];
    console.log(data_array[i])
  }
  data_array[size-1]=[(parseInt(data_array[data_array.length-1][0])+1).toString(),data_array[data_array.length-1][1]+1000,data_array[data_array.length-1][2]+100]
  drawChart()
}