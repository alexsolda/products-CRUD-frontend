import axios from "axios";

export const api = axios.create({
  baseURL: "https://murmuring-savannah-09721.herokuapp.com/api/",
});
