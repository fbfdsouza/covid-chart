import { countries, datedWorldData, summary } from "./mockedData";

export const getCountries = () => {
    return Promise.resolve(countries)
  };
  
  export const getSummary = () => {
    return Promise.resolve({data: summary})
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
    return Promise.resolve(datedWorldData)
  };
  