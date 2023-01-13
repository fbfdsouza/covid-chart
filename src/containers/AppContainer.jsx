import React, { useEffect, useState, useCallback, useMemo } from "react";
import Dropdown from "../components/Dropdown";
import IntervalDatePicker from "../components/IntervalDatePicker";
import GraphCard from "../components/GraphCard";
import {
  orderByOptionLabel,
  formatDateToApi,
  returnFromInterval,
  updateFromAndToDateBasedOnInterval,
  updateGraph
} from "../../utils/utils";
import "../../index.css";
import { AppWrapper, HeaderWrapper } from "./../styled";
import { getCountryData, getSummary, getWorldData } from "../api/covidAPI";
import useCountries from "../hooks/useCountries";
import { graphTypeConstants } from "../../constants"


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

  useEffect(() => {
    if (selectedCountry === "world" && !fromDate && !toDate) {
      (async () => {
        const result = await getSummary();
        const { TotalConfirmed, TotalDeaths, TotalRecovered } =
          result.data.Global;
        setDataView(updateGraph(
          { TotalConfirmed, TotalDeaths, TotalRecovered },
          graphTypeConstants.COLUMN))
      })();

      return;
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
          setDataView(updateGraph(
            { days, confirmed, deaths, recovered },
            graphTypeConstants.LINE,
          ))
        } else {
          const { TotalConfirmed, TotalDeaths, TotalRecovered } =
            result.data[0];
          setDataView(updateGraph(
            {
              TotalConfirmed,
              TotalDeaths,
              TotalRecovered,
            },
            graphTypeConstants.COLUMN))
        }
      })();

      return;
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
        setDataView(updateGraph(
          { TotalConfirmed, TotalDeaths, TotalRecovered },
          graphTypeConstants.COLUMN
        ))
      })();

      return;
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
          setDataView(updateGraph(
            { days, confirmed, deaths, recovered },
            graphTypeConstants.LINE))
        } else {
          const { Confirmed, Deaths, Recovered } = result.data[0];
          setDataView(updateGraph(
            {
              TotalConfirmed: Confirmed,
              TotalDeaths: Deaths,
              TotalRecovered: Recovered,
            },
            graphTypeConstants.COLUMN
          ))
        }
      })();

      return;
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
