export const orderByOptionLabel = (option1, option2) => {
  if (option1.label < option2.label) {
    return -1;
  }
  if (option1.label > option2.label) {
    return 1;
  }
  return 0;
};

export const chartOptions = {
  chart: {
    type: "column",
  },
  title: {
    text: "Covid Analytics",
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Covid Analytics",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
      },
    },
  },

  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: [
        {
          name: "Total Confirmed Cases",
          y: 10,
          drilldown: "Total Confirmed Cases",
        },
        {
          name: "Total Deaths Cases",
          y: 7,
          drilldown: "Total Deaths",
        },
        {
          name: "Total Recovered Cases",
          y: 5,
          drilldown: "Total Recovered Cases",
        },
      ],
    },
  ],
};

export const formatDateToApi = (date) => {
  return date?.toISOString()?.replace(/.\d+Z$/g, "Z");
};
