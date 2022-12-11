
// import {Chart, Point} from 'chart.js'
import {Chart} from "./Charts/chart"
import { Moment } from 'moment';
import chartjs from 'chart.js';
chartjs.Chart

const plugin = {
    afterDraw: (chartInstance: Chart, easing: Chart.Easing, options?: any) => { },
}

const ctx = new CanvasRenderingContext2D();


export const LineChart = ({data}) => {

    const chart: Chart = new Chart(ctx, {
        type: 'line',
        plugins: [plugin, plugin],
        data:{
            labels: ['Length'],
            datasets: [
                {
                    backgroundColor: '#000000',
                    hoverBackgroundColor: ctx.createLinearGradient(0, 0, 0, 100),
                    hoverBorderColor: ctx.createLinearGradient(0, 0, 0, 100),
                    borderWidth: 1,
                    label: 'test',
                    data: data,

                }

            ],


        },
        options: {
            hover: {
                axis: 'xy',
                mode: 'nearest',
                animationDuration: 400,
                intersect: true,
            },
            onHover(ev: MouseEvent, points: any[]) {
                return;
            },
            title: {
                text: ['foo', 'bar'],
            },
            tooltips: {
                filter: data => Number(data.yLabel) > 0,
                intersect: true,
                mode: 'index',
                axis: 'x',
                itemSort: (a, b, data) => Math.random() - 0.5,
                position: 'average',
                caretPadding: 2,
                displayColors: true,
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                titleAlign: 'center',
                callbacks: {
                    title: ([point]) => (point.label ? point.label.substring(0, 2) : 'title'),
                    label(tooltipItem) {
                        const { value, x, y, label } = tooltipItem;
                        return `${label}(${x}, ${y}) = ${value}`;
                    },
                },
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            callback: (value) => {
                                if (value === 10) {
                                    return Math.floor(value);
                                }
    
                                if (value === 20) {
                                    return `${value}`;
                                }
    
                                if (value === 30) {
                                    return undefined;
                                }
    
                                return null;
                            },
                            sampleSize: 10,
                        },
                        gridLines: {
                            display: false,
                            borderDash: [5, 15],
                            borderDashOffset: 2,
                            zeroLineBorderDash: [5, 15],
                            zeroLineBorderDashOffset: 2,
                            lineWidth: [1, 2, 3],
                        },
                    },
                ],
            },
            elements: {
                rectangle: {
                    backgroundColor(ctx) {
                        if (ctx.dataset && typeof ctx.dataset.backgroundColor === "function") {
                            return ctx.dataset.backgroundColor(ctx);
                        }
    
                        if (ctx.dataset && Array.isArray(ctx.dataset.backgroundColor)) {
                            return ctx.dataset.backgroundColor[0] || "red";
                        }
    
                        if (!ctx.dataset) {
                            return "red";
                        }
    
                        return (ctx.dataset.backgroundColor as Chart.ChartColor | string) || "red";
                    }
                }
            },
            legend: {
                align: 'center',
                display: true,
                labels: {
                    usePointStyle: true,
                    padding: 40,
                },
            },
            devicePixelRatio: 2,
            plugins: {
                bar: false,
                foo: {},
            },
        },
    });


    chart.update({ duration: 500, lazy: false, easing: 'linear' });

    console.log(chart.getDatasetMeta(0));

    console.log(chart.ctx && chart.ctx.font);
    console.log(chart.canvas && chart.canvas.tagName);
    if (chart.chartArea) {
        console.log(chart.chartArea.top);
        console.log(chart.chartArea.right);
        console.log(chart.chartArea.bottom);
        console.log(chart.chartArea.left);
    }

    chart.isDatasetVisible(0); // $ExpectType boolean
    chart.setDatasetVisibility(0, false); // $ExpectType void
    chart.isDatasetVisible(0); // $ExpectType boolean
    chart.getVisibleDatasetCount(); // $ExpectType number

    chart.config.options = {
        ...chart.config.options,
        legend: {
            display: false,
        },
        legendCallback: () => 'legend replacement',
    };
    chart.update();
    const customLegend = chart.generateLegend();
    console.log(customLegend === 'legend replacement');

    // linear scale
const linearScaleChart: Chart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            backgroundColor: '#000',
            borderColor: '#f00',
            data: [],
            type: 'line',
        }]
    },
    options: {
        scales: {
            displayFormats: {
                month: 'MMM YYYY',
            },
            xAxes: [{
                type: 'time',
                adapters: {
                    date: {
                        locale: 'de'
                    }
                },
                distribution: 'series',
                ticks: {
                    source: 'data',
                    autoSkip: true,
                    sampleSize: 1,
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Closing price ($)'
                },
                afterBuildTicks: (scale, ticks) => {
                    return [Math.max(...ticks), 10, Math.min(...ticks)];
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index',
        }
    }
});

// platform global values
Chart.platform.disableCSSInjection = true;

// Chart instances in the global namespace
for (const id in Chart.instances) {
    Chart.instances[id].resize();
}

// default global static values
Chart.defaults.global.defaultFontColor = '#544615';
Chart.defaults.global.defaultFontFamily = 'Arial';
Chart.defaults.global.tooltips.backgroundColor = '#0a2c54';
Chart.defaults.global.tooltips.cornerRadius = 2;
Chart.defaults.global.tooltips.displayColors = false;
Chart.defaults.global.defaultColor = ctx.createLinearGradient(0, 0, 0, 100);

// Update Chart defaults using scaleService
Chart.scaleService.updateScaleDefaults('time', {
    gridLines: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false,
    },
    ticks: {
        padding: 20,
    },
});

}

