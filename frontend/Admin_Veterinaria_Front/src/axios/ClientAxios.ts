import axios from "axios";
export const ClientAxios = axios.create({
    baseURL: "http://localhost:3000/",
});