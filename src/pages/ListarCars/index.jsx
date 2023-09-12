import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'
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

    return (

        <>
            <Header />


                <div
                style={{
                    display: 'flex',
                    width: 100,
                    marginLeft: 150,
                    fontSize: 30,
                    marginTop:30
                }}
                >
                <Link to="/cars"
                    style={{
                        color: "white"
                    }}
                > <FiArrowLeft /></Link>
                </div>
                <h1
                style={{
                    textAlign: 'center'
                }}
                >
                Lista de Carros</h1>
            <Table>
                <table>

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