import { Link } from "react-router-dom"
import { FiArrowLeft, FiPlus, FiSearch } from 'react-icons/fi'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header"
import { Container, FormBusca } from "./style"
import Swal from 'sweetalert2'


import { addMascaraCep } from "../../service/mascara"
import { api } from "../../service/api";
import { useCallback, useEffect, useState } from "react";

export function Endereco() {

    const [endereco, setEndereco] = useState([])
    const [rowCountState, setRowCountState] = useState()
    const [page, setPage] = useState({
        page: 0,
        pageSize: 5,
    })

    const qtdPg = Math.ceil(rowCountState / page.pageSize)



    const { register, handleSubmit, watch } = useForm();

    const buscaNome = useCallback((e) => {
        async function request(e) {
            const response = await api.get(
                `/endereco/lista/page?nomeEnd=${e.nomeEnd}&bairro=${e.bairro}&numero=${e.numero}&cidade=${e.cidade}&cep=${e.cep}&estado=${e.estado}&name=${e.nome}&page=${page.page}`
            )

            console.log(response.data.list)
            setEndereco(response.data.list)

        }
        request(e)
    }, [])


    const fetchPageData = useCallback(async (pageNumber) => {
        if (pageNumber) {
            let nomeEnd = '', bairro = '', numero = '', cidade = '', cep = '', estado = '', nome = ''
            const response = await api.get(
                `/endereco/lista/page?nomeEnd=${nomeEnd}&bairro=${bairro}&numero=${numero}&cidade=${cidade}&cep=${cep}&estado=${estado}&name=${nome}&page=${pageNumber}`
            )
            setPage(prevState => ({
                ...prevState,
                page: prevState.page = pageNumber > qtdPg ? qtdPg : pageNumber
            }))
            setEndereco(response.data.list);
            setRowCountState(response.data.rowCount)

        }
    }, []);


    const listEndereco = useCallback(() => {

        async function request() {
            let nomeEnd = '', bairro = '', numero = '', cidade = '', cep = '', estado = '', nome = ''
            const response = await api.get(
                `/endereco/lista/page?nomeEnd=${nomeEnd}&bairro=${bairro}&numero=${numero}&cidade=${cidade}&cep=${cep}&estado=${estado}&name=${nome}&page=${page}`
            )

            console.log(response.data)
            setRowCountState(response.data.rowCount)
            setEndereco(response.data.list)
        }
        request()
    }, [])

    const delet = useCallback((id) => {
        function removEnd(id) {
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
                    await api.delete(`/endereco/${id}`);
                    listEndereco();
                }
            });
        }
        removEnd(id);
    }, [listEndereco]);


    useEffect(() => {

        listEndereco()

    }, [])


    return (

        <>
            <Header></Header>
            <h2
                style={{
                    textAlign: 'center',
                    margin: 15,
                }}
            >Lista de endereços</h2>

            <div
                style={{
                    display: "flex",
                    margin: 10,
                    marginLeft: 100,
                    marginRight: 100,
                    justifyContent: "space-between"

                }}
            >
                <Link to="/"
                    style={{
                        color: "white",
                        fontSize: 32
                    }}
                > <FiArrowLeft /></Link>

                <Link
                    to="/newEnd"
                    style={{
                        color: "white",
                        fontSize: 32
                    }}>
                    <FiPlus></FiPlus>
                </Link>
            </div>

            <FormBusca>
                <h3>Busca Personalizada</h3>
                <form onSubmit={handleSubmit(buscaNome)}>
                    <input type="text" placeholder="Endereço"
                        {...register("nomeEnd")}
                    />

                    <input type="text" placeholder="Bairro"
                        {...register("bairro")}
                    />
                    <input type="text" placeholder="Numero"
                        {...register("numero")}
                    />
                    <input type="text" placeholder="Cidade"
                        {...register("cidade")}
                    />
                    <input type="text" placeholder="Cep"
                        {...register("cep")}
                    />
                    <input type="text" placeholder="Estado"
                        {...register("estado")}
                    />
                    <input type="text" placeholder="Nome"
                        {...register("nome")}
                    />
                    <button type="submit"><FiSearch /></button>
                </form>

            </FormBusca>


            <Container>


                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Endereço</th>
                            <th>Bairro</th>
                            <th>Numero</th>
                            <th>Cidade</th>
                            <th>Complemento</th>
                            <th>Cep</th>
                            <th>Estado</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            endereco.map(end => (
                                <tr key={String(end.id)}>
                                    <td>{end.nomeEnd.toUpperCase()}</td>
                                    <td>{end.bairro.toUpperCase()}</td>
                                    <td>{end.numero}</td>
                                    <td>{end.cidade.toUpperCase()}</td>
                                    <td>{end.complemento.toUpperCase()}</td>
                                    <td>{addMascaraCep(end.cep)}</td>
                                    <td>{end.estado}</td>
                                    <td>{end.name.toUpperCase()}</td>
                                    <td>

                                        <Link to={`/newEnd/${end.id}`} className="edit"
                                        >
                                            <AiFillEdit />
                                        </Link>

                                        <button
                                            onClick={() => delet(end.id)}
                                            className="delete">
                                            <AiFillDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <div className="page"
                    >
                        <button onClick={() => fetchPageData(Number(page.page) - Number(1))}>Prev</button>
                        <button>Atual: {page.page}</button>
                        <button onClick={() => fetchPageData(Number(page.page) + Number(1))}>Prox</button>
                        <button onClick={() => fetchPageData(page.lastPage)}>Ult.: {page.lastPage}</button>
                        <p>Qtd: {rowCountState}</p>

                    </div>
                </table>

            </Container>

        </>
    )
}
