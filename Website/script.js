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


};
function drawChart() {
    var data = google.visualization.arrayToDataTable(data_array);
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    // var chart2 = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);

    // chart2.draw(data, options);

}

function selectHandler(e) {
  alert('A table row was selected');
}




