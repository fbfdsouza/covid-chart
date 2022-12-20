import fetchCovidInfo from "./baseAPI";

export const getCountries = () => {
  return fetch("https://api.covid19api.com/countries");
};

export const getSummary = () => {
  return fetchCovidInfo.get("/summary");
};

export const getCountryData = (country, fromdDate, toDate) => {
  return fetchCovidInfo.get(`/${country}`, {
    params: {
      from: fromdDate,
      to: toDate,
    },
  });
};

export const getWorldData = (fromdDate, toDate) => {
  return fetchCovidInfo.get("/world", {
    params: {
      from: fromdDate,
      to: toDate,
    },
  });
};
