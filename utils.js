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
};

export const formatDateToApi = (date) => {
  return date?.toISOString()?.replace(/.\d+Z$/g, "Z");
};

export const formatToSimpleDate = (date) => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const dateSort = (date1, date2) => {
  return new Date(date1) - new Date(date2);
};
