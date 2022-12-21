import axios from "axios";

export const fetchCovidInfo = axios.create({
  baseURL: "https://api.covid19api.com",
});
