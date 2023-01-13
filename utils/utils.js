import { graphTypeConstants } from "../constants";

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

const formatToSimpleDate = (date) => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const dateSort = (date1, date2) => {
  return new Date(date1) - new Date(date2);
};

export const returnFromInterval = (intervalData, graphType) => {
  //only end point related to world has the attribute NewConfirmed
  if (graphType !== graphTypeConstants.LINE) {
    if (intervalData.length > 1) {
      if (intervalData[0].hasOwnProperty("NewConfirmed")) {
        return intervalData.reduce(
          (acc, country) => {
            return {
              TotalConfirmed:
                Number(acc.TotalConfirmed) + Number(country.NewConfirmed),
              TotalDeaths:
                Number(acc.TotalDeaths) + Number(country.NewDeaths),
              TotalRecovered:
                Number(acc.TotalRecovered) + Number(country.NewRecovered),
            };
          },
          { TotalConfirmed: 0, TotalDeaths: 0, TotalRecovered: 0 }
        );
      }
      return {
        TotalConfirmed:
          Number(intervalData[intervalData.length - 1].Confirmed) -
          Number(intervalData[0].Confirmed),
        TotalDeaths:
          Number(intervalData[intervalData.length - 1].Deaths) -
          Number(intervalData[0].Deaths),
        TotalRecovered:
          Number(intervalData[intervalData.length - 1].Recovered) -
          Number(intervalData[0].Recovered),
      };
    } else {
      if (intervalData[0].hasOwnProperty("NewConfirmed")) {
        return {
          TotalConfirmed: Number(intervalData[0].TotalConfirmed),
          TotalDeaths: Number(intervalData[0].TotalDeaths),
          TotalRecovered: Number(intervalData[0].TotalRecovered),
        };
      }

      return {
        TotalConfirmed: Number(intervalData[0].Confirmed),
        TotalDeaths: Number(intervalData[0].Deaths),
        TotalRecovered: Number(intervalData[0].Recovered),
      };
    }
  } else if (intervalData.length > 1) {
    if (intervalData[0].hasOwnProperty("NewConfirmed")) {
      return [
        intervalData.map((item) => formatToSimpleDate(new Date(item.Date))),
        intervalData.map((item) => item.TotalConfirmed),
        intervalData.map((item) => item.TotalDeaths),
        intervalData.map((item) => item.TotalRecovered),
      ];
    } else {
      return [
        intervalData.map((item) => formatToSimpleDate(new Date(item.Date))),
        intervalData.map((item) => item.Confirmed),
        intervalData.map((item) => item.Deaths),
        intervalData.map((item) => item.Recovered),
      ];
    }
  }
};

export const updateFromAndToDateBasedOnInterval = (fromDateString, toDateString) => {
  const updatedFromDate = new Date(fromDateString);
  const updatedToDate = new Date(toDateString);
  if (fromDateString === toDateString) {
    updatedFromDate.setUTCHours(0);
    updatedToDate.setUTCHours(23);
    updatedToDate.setMinutes(59);
    updatedToDate.setSeconds(59);
    return [formatDateToApi(updatedFromDate), formatDateToApi(updatedToDate)];
  }
  updatedFromDate.setUTCHours(0);
  updatedToDate.setUTCHours(0);
  return [updatedFromDate, updatedToDate];
};

export const updateGraph = (graphData, chartType, chartOptions) => {
  const series =
    chartType !== graphTypeConstants.LINE
      ? [
          {
            name: "Browsers",
            colorByPoint: true,
            data: [
              {
                name: "Total Confirmed Cases",
                y: graphData?.TotalConfirmed,
                drilldown: "Total Confirmed Cases",
              },
              {
                name: "Total Deaths Cases",
                y: graphData?.TotalDeaths,
                drilldown: "Total Deaths",
              },
              {
                name: "Total Recovered Cases",
                y: graphData?.TotalRecovered,
                drilldown: "Total Recovered Cases",
              },
            ],
          },
        ]
      : [
          {
            name: "Confirmed Cases",
            data: graphData?.confirmed,
          },
          {
            name: "Death Cases",
            data: graphData?.deaths,
          },
          {
            name: "Recovered Cases",
            data: graphData?.recovered,
          },
        ];
  const dataView = {
    ...chartOptions,
    chart: {
      type: chartType,
    },
    series,
    xAxis: {
      categories: graphData?.days
        ? graphData?.days?.sort(dateSort)
        : graphData?.days,
    },
  };

  return dataView;
};