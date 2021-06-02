import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import IntervalDatePicker from "../components/IntervalDatePicker";
import covidInfo from "../api/fetchCovidInfo";
import GraphCard from "../components/GraphCard";
import { orderByOptionLabel, chartOptions, formatDateToApi } from "../../utils";
import "../../index.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    label: "world",
    value: "world",
  });
  const [dataView, setDataView] = useState(chartOptions);
  const [fromDate, setFromDate] = useState(undefined);
  const [toDate, setToDate] = useState(undefined);

  const returnFromInterval = (intervalData) => {
    //only end point related to world has the attribute NewConfirmed
    if (intervalData.length > 1) {
      if (intervalData[0].hasOwnProperty("NewConfirmed")) {
        return intervalData.reduce(
          (acc, country) => {
            return {
              TotalConfirmed:
                Number(acc.TotalConfirmed) + Number(country.NewConfirmed),
              TotalDeaths: Number(acc.TotalDeaths) + Number(country.NewDeaths),
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

  const updateGraph = (TotalConfirmed, TotalDeaths, TotalRecovered) => {
    setDataView({
      ...chartOptions,
      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: [
            {
              name: "Total Confirmed Cases",
              y: TotalConfirmed,
              drilldown: "Total Confirmed Cases",
            },
            {
              name: "Total Deaths Cases",
              y: TotalDeaths,
              drilldown: "Total Deaths",
            },
            {
              name: "Total Recovered Cases",
              y: TotalRecovered,
              drilldown: "Total Recovered Cases",
            },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    (async () => {
      const result = await covidInfo.get("/countries");
      setCountries(result.data);
    })();
  }, []);

  useEffect(() => {
    if (selectedCountry.label === "world" && !fromDate && !toDate) {
      (async () => {
        const result = await covidInfo.get(`/summary`);
        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          result.data.Global;
        updateGraph(TotalConfirmed, TotalDeaths, TotalRecovered);
      })();
    }

    if (selectedCountry.label === "world" && fromDate && toDate) {
      (async () => {
        let fromDateString = formatDateToApi(fromDate);
        let toDateString = formatDateToApi(toDate);

        [fromDateString, toDateString] = updateFromAndToDateBasedOnInterval(
          fromDateString,
          toDateString
        );
        const result = await covidInfo.get("/world", {
          params: {
            from: fromDateString,
            to: toDateString,
          },
        });

        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          returnFromInterval(result.data);
        updateGraph(TotalConfirmed, TotalDeaths, TotalRecovered);
      })();
    }

    if (selectedCountry.label !== "world" && !fromDate && !toDate) {
      (async () => {
        const result = await covidInfo.get(`/summary`);
        const filteredCountry = result?.data?.Countries?.filter(
          (countryItem) => countryItem.Country === selectedCountry.label
        )[0];
        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          filteredCountry || {
            TotalConfirmed: 0,
            TotalDeaths: 0,
            TotalRecovered: 0,
          };
        updateGraph(TotalConfirmed, TotalDeaths, TotalRecovered);
      })();
    }

    if (selectedCountry.label !== "world" && fromDate && toDate) {
      (async () => {
        let fromDateString = formatDateToApi(fromDate);
        let toDateString = formatDateToApi(toDate);

        [fromDateString, toDateString] = updateFromAndToDateBasedOnInterval(
          fromDateString,
          toDateString
        );

        const result = await covidInfo.get(
          `/country/${selectedCountry.label}`,
          {
            params: {
              from: fromDateString,
              to: toDateString,
            },
          }
        );

        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          returnFromInterval(result.data);
        updateGraph(TotalConfirmed, TotalDeaths, TotalRecovered);
      })();
    }
  }, [selectedCountry, fromDate, toDate]);

  const handleFromChange = (day) => {
    setFromDate(day);
  };

  const handleToChange = (day) => {
    setToDate(day);
  };

  const convertCountryToOptions = (_countries) => {
    const countryOptions = _countries.map((_country) => {
      return { label: _country.Country, value: _country.ISO2 };
    });

    return [
      { label: "world", value: "world" },
      ...countryOptions.sort(orderByOptionLabel),
    ];
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Dropdown
          label="Select a location Context"
          options={convertCountryToOptions(countries)}
          selected={selectedCountry}
          onSelectedChange={setSelectedCountry}
        />

        <IntervalDatePicker
          label="Select a date range"
          fromDate={fromDate}
          toDate={toDate}
          fromDateHandler={handleFromChange}
          toDateHandler={handleToChange}
        />
      </div>
      <GraphCard options={dataView} />
    </div>
  );
}

export default App;
