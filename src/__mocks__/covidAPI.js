import { countries, datedWorldData, summary } from "./mockedData";

export const getCountries = () => {
    return new Promise.resolve(countries)
  };
  
  export const getSummary = () => {
    return new Promise.resolve(summary)
  };
  
  export const getCountryData = (country, fromdDate, toDate) => {
    return fetchCovidInfo.get(`/${country}`, {
      params: {
        from: fromdDate,
        to: toDate,
      },
    });
  };
  
  export const getWorldData = () => {
    return new Promise.resolve(datedWorldData)
  };
  