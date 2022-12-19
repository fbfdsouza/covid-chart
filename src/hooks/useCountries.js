import { useEffect, useState } from "react";
import { getCountries } from "../api/covidAPI";

const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getCountries();
      setCountries(result.data);
    })();
  }, []);

  return countries;
};

export default useCountries;
