import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export function addMascaraCep(cep) {
    const cepString = String(cep);

    return (
        cepString.slice(0, 2) +
        "." +
        cepString.slice(2, 5) +
        "-" +
        cepString.slice(5)
    );
}

export function removeMascaraCep(cep){
    const c = cep.replace('.', '').replace(/-/, '')
    return c;
}

