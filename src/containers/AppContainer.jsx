import React, { useEffect, useState, useCallback, useMemo } from "react";
import Dropdown from "../components/Dropdown";
import IntervalDatePicker from "../components/IntervalDatePicker";
import GraphCard from "../components/GraphCard";
import {
  orderByOptionLabel,
  chartOptions,
  formatDateToApi,
  formatToSimpleDate,
  dateSort,
} from "../../utils";
import "../../index.css";
import { AppWrapper, HeaderWrapper } from "./../styled";
import { getCountryData, getSummary, getWorldData } from "../api/covidAPI";
import useCountries from "../hooks/useCountries";

const graphTypeConstants = {
  LINE: "line",
  COLUMN: "column",
};

function App() {
  const countries = useCountries();
  const [selectedCountry, setSelectedCountry] = useState("world");
  const [dataView, setDataView] = useState({});
  const [fromDate, setFromDate] = useState(undefined);
  const [toDate, setToDate] = useState(undefined);

  const handleSelectCountryOption = useCallback(
    (option) => {
      setSelectedCountry(option.label);
    },
    [selectedCountry]
  );

  const returnFromInterval = (intervalData, graphType) => {
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

  const updateFromAndToDateBasedOnInterval = (fromDateString, toDateString) => {
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

  const updateGraph = (graphData, chartType) => {
    const series =
      chartType !== graphTypeConstants.LINE
        ? [
            {
              name: "Browsers",
              colorByPoint: true,
              data: [
                {
                  name: "Total Confirmed Cases",
                  y: graphData.TotalConfirmed,
                  drilldown: "Total Confirmed Cases",
                },
                {
                  name: "Total Deaths Cases",
                  y: graphData.TotalDeaths,
                  drilldown: "Total Deaths",
                },
                {
                  name: "Total Recovered Cases",
                  y: graphData.TotalRecovered,
                  drilldown: "Total Recovered Cases",
                },
              ],
            },
          ]
        : [
            {
              name: "Confirmed Cases",
              data: graphData.confirmed,
            },
            {
              name: "Death Cases",
              data: graphData.deaths,
            },
            {
              name: "Recovered Cases",
              data: graphData.recovered,
            },
          ];
    setDataView({
      ...chartOptions,
      chart: {
        type: chartType,
      },
      series,
      xAxis: {
        categories: graphData.days
          ? graphData.days.sort(dateSort)
          : graphData.days,
      },
    });
  };

  useEffect(() => {
    if (selectedCountry === "world" && !fromDate && !toDate) {
      (async () => {
        const result = await getSummary();
        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          result.data.Global;
        updateGraph(
          { TotalConfirmed, TotalDeaths, TotalRecovered },
          graphTypeConstants.COLUMN
        );
      })();
    }

    if (selectedCountry === "world" && fromDate && toDate) {
      (async () => {
        let fromDateString = formatDateToApi(fromDate);
        let toDateString = formatDateToApi(toDate);

        [fromDateString, toDateString] = updateFromAndToDateBasedOnInterval(
          fromDateString,
          toDateString
        );

        const result = await getWorldData(fromDateString, toDateString);

        if (result.data.length > 1) {
          const [days, confirmed, deaths, recovered] = returnFromInterval(
            result.data,
            graphTypeConstants.LINE
          );
          updateGraph(
            { days, confirmed, deaths, recovered },
            graphTypeConstants.LINE
          );
        } else {
          const { TotalConfirmed, TotalDeaths, TotalRecovered } =
            result.data[0];
          updateGraph(
            {
              TotalConfirmed,
              TotalDeaths,
              TotalRecovered,
            },
            graphTypeConstants.COLUMN
          );
        }
      })();
    }

    if (selectedCountry !== "world" && !fromDate && !toDate) {
      (async () => {
        const result = await getSummary();
        const filteredCountry = result?.data?.Countries?.filter(
          (countryItem) => countryItem.Country === selectedCountry
        )[0];
        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          filteredCountry || {
            TotalConfirmed: 0,
            TotalDeaths: 0,
            TotalRecovered: 0,
          };
        updateGraph(
          { TotalConfirmed, TotalDeaths, TotalRecovered },
          graphTypeConstants.COLUMN
        );
      })();
    }

    if (selectedCountry !== "world" && fromDate && toDate) {
      (async () => {
        let fromDateString = formatDateToApi(fromDate);
        let toDateString = formatDateToApi(toDate);

        [fromDateString, toDateString] = updateFromAndToDateBasedOnInterval(
          fromDateString,
          toDateString
        );

        const result = await getCountryData(selectedCountry, fromDateString, toDateString)

        if (result.data.length > 1) {
          const [days, confirmed, deaths, recovered] = returnFromInterval(
            result.data,
            graphTypeConstants.LINE
          );
          updateGraph(
            { days, confirmed, deaths, recovered },
            graphTypeConstants.LINE
          );
        } else {
          const { Confirmed, Deaths, Recovered } = result.data[0];
          updateGraph(
            {
              TotalConfirmed: Confirmed,
              TotalDeaths: Deaths,
              TotalRecovered: Recovered,
            },
            graphTypeConstants.COLUMN
          );
        }
      })();
    }
  }, [selectedCountry, fromDate, toDate]);

  const handleFromChange = useCallback(
    (day) => {
      setFromDate(day);
    },
    [fromDate?.toDateString()]
  );

  const handleToChange = useCallback(
    (day) => {
      setToDate(day);
    },
    [toDate?.toDateString()]
  );

  const convertCountryToOptions = (_countries) => {
    const countryOptions = _countries.map((_country) => {
      return { label: _country.Country, value: _country.ISO2 };
    });

    return [
      { label: "world", value: "world" },
      ...countryOptions.sort(orderByOptionLabel),
    ];
  };

  const countryOptions = useMemo(
    () => convertCountryToOptions(countries),
    [countries.length]
  );

  const memoizedFromDate = useMemo(() => fromDate, [fromDate?.toDateString()]);
  const memoizedToDate = useMemo(() => toDate, [toDate?.toDateString()]);
  const memoizedDataView = useMemo(() => {
    return dataView;
  }, [
    fromDate?.toDateString(),
    toDate?.toDateString(),
    selectedCountry,
    JSON.stringify(dataView),
  ]);

  return (
    <AppWrapper>
      <HeaderWrapper>
        <Dropdown
          label="Select a location context"
          options={countryOptions}
          selected={selectedCountry}
          onSelectedChange={handleSelectCountryOption}
        />

        <IntervalDatePicker
          label="Select a date range"
          fromDate={memoizedFromDate}
          toDate={memoizedToDate}
          fromDateHandler={handleFromChange}
          toDateHandler={handleToChange}
        />
      </HeaderWrapper>
      <GraphCard options={memoizedDataView} />
    </AppWrapper>
  );
}

export default App;
