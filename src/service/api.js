import axios from "axios";
const PORT = import.meta.env.VITE_PORT;

export const api = axios.create({
    baseURL:PORT

});


