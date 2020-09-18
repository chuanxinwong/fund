var chartConfig = {
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  },
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "bar",
      label: {
        show: true,
        position: "top",
      },
    },
  ],
};
