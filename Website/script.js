// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

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
    legend: { position: 'bottom' }
};
function drawChart() {
    data_array.push([(parseInt(data_array[data_array.length-1][0])+1).toString(),data_array[data_array.length-1][1]+1,data_array[data_array.length-1][2]+1])
    var data = google.visualization.arrayToDataTable(data_array);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
}


var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
}, delayInMilliseconds);