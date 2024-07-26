function updatePieChart(data7) {
    try {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("PieChart");

        root.numberFormatter.set("numberFormat", "####");
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "Amount",
            categoryField: "Code"
        }));


        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        data = []
        for (i = 0; i < 4; i++) {
            data.push(data7[i])
        }

        series.data.setAll(data7);


        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15
        }));

        legend.data.setAll(series.dataItems);


        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        series.appear(100, 100);
    } catch (e) {
        console.log(e);
    }
}

function fetchDataAndUpdatePieChart() {
    fetch('/get_PieChart')
        .then(response => response.json())
        .then(data => {
            updatePieChart(data);
        })
        .catch(error => console.error('Error:', error))
}

document.addEventListener("DOMContentLoaded", function() {
    fetchDataAndUpdatePieChart();
});