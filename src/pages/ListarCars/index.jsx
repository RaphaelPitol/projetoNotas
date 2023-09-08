
import { Header } from "../../components/Header";
import { Table } from "./styles";
import { useState, useEffect } from "react";
import { api } from "../../service/api";

export function ListarCars() {

    const [cars, setCars] = useState([])

    useEffect(() => {
        async function listCars() {
            const response = await api.get('/cars');
            setCars(response.data);
        }
        listCars()
    }, [])
    console.log(cars)
    return (

        <>
            <Header />

            <Table>

                <table
                style={{
                    fontSize: 20,
                    background:" #303030",
                    
                }}
                >

                    <tr>
                        <td>Nome</td>
                        <td>Marca</td>
                        <td>Ano de Fabricação</td>
                        <td>Proprietario</td>
                    </tr>
                    {
                        cars.map(car => (
                            <tr>
                                <td>{car.nome}</td>
                                <td>{car.marca}</td>
                                <td>{car.ano_fabricacao}</td>
                                <td>{car.name}</td>
                            </tr>
                        ))
                    }

                </table>

            </Table>

        </>
    )
}