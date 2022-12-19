import fetchCovidInfo from "./baseAPI";

export const getCountries = () => {
  return fetchCovidInfo.get("/countries");
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
