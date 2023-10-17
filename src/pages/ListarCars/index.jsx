import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Header } from "../../components/Header";
import { Table } from "./styles";
import { useState, useEffect, useCallback } from "react";
import { api } from "../../service/api";
import Swal from 'sweetalert2'

export function ListarCars() {
    const [cars, setCars] = useState([])

    const listCars = useCallback(() => {
        async function request() {
            const response = await api.get('/cars');
            setCars(response.data);
        }

        request()

    }, [])

    useEffect(() => {
        listCars()
    }, [])

    const delet = useCallback((id)=>{
        async function handleRemoveCar(id) {
            Swal.fire({
                text: "Você realmente deseja Excluir?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim!',
                cancelButtonText: 'Não'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await api.delete(`/cars/${id}`);
                    listCars();
                }
            });

            // const confirm = window.confirm('Deseja realmente Excluir?')
            // if (confirm) {
            //     await api.delete(`/cars/${id}`);
            //     listCars()
            // }
        }
        handleRemoveCar(id)
    },[])

    return (

        <>
            <Header />


            <div
                style={{
                    display: 'flex',
                    width: 100,
                    marginLeft: 150,
                    fontSize: 30,
                    marginTop: 30
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
                    <tbody>
                        <tr>
                            <td>Nome</td>
                            <td>Marca</td>
                            <td>Ano de Fabricação</td>
                            <td>Proprietario</td>
                            <td>Ação</td>
                        </tr>

                        {
                            cars.map(car => (
                                <tr key={String(car.id)}>
                                    <td>{car.nome}</td>
                                    <td>{car.marca}</td>
                                    <td>{car.ano_fabricacao}</td>
                                    <td>{car.name}</td>
                                    <td>

                                        <Link to={`/cars/${car.id}`} className="edit"
                                        >
                                            <AiFillEdit />
                                        </Link>

                                        <button
                                            onClick={() => delet(car.id)}
                                            className="delete">
                                            <AiFillDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>

            </Table>

        </>
    )
}
