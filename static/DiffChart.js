function fetchDataAndUpdateDiffChart() {
    fetch('/get_LineSalesAndPurchasing')
        .then(response => response.json())
        .then(data => {
            updateDiffChart(data);
        })
        .catch(error => console.error('Error:', error))
}

function updateDiffChart(data00) {


    try {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("DiffChart");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0,

        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));
        cursor.lineY.set("visible", false);

        // Generate random data
        // var date = new Date();
        // date.setHours(0, 0, 0, 0);
        // var value = 100;

        // function generateData() {
        // value = Math.round(Math.random() * 10 - 5 + value);

        // am5.time.add(date, "day", 1);
        // return { date: date.getTime(), value: value };
        // }





        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: "day", count: 1 }, // Show data for every 7 days
            renderer: am5xy.AxisRendererX.new(root, {
                minorGridEnabled: true
            }),
            tooltip: am5.Tooltip.new(root, {})
        }));


        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "Value",
            valueXField: "Date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}",


            })
        }));



        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
            orientation: "horizontal",
            height: 60
        }));

        var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.DateAxis.new(root, {
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                minorGridEnabled: true,
                minGridDistance: 70
            })
        }));

        var sbValueAxis = scrollbar.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
            valueYField: "Value",
            valueXField: "Date",
            xAxis: sbDateAxis,
            yAxis: sbValueAxis
        }));
        var data = [];
        for (var i = 0; i < 1098; ++i) {
            data.push(data00[i]);
        }


        series.data.setAll(data);
        sbSeries.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    } catch (e) {
        console.log(e);
    }



}
document.addEventListener("DOMContentLoaded", function() {
    fetchDataAndUpdateDiffChart();
});