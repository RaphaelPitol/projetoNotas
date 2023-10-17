import { Header } from "../../components/Header"
import { FormBusca, Conatiner } from "./style";
import './style.css'

import { FiArrowLeft, FiPlus, FiSearch } from 'react-icons/fi'
import { useForm } from "react-hook-form";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Swal from 'sweetalert2'
import { api } from "../../service/api";
import { Link } from "react-router-dom";

import { alpha, styled } from '@mui/material/styles';
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box'
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";
import { array } from "yup";

export function Teste() {
    const columns = [
        { field: "nomeEnd", headerName: "ENDEREÇO", headerClassName: 'super-app-theme--header', width: 200 },
        { field: "bairro", headerName: "BAIRRO", headerClassName: 'super-app-theme--header', width: 120 },
        { field: "numero", headerName: "NUMERO", headerClassName: 'super-app-theme--header', width: 100 },
        { field: "cidade", headerName: "CIDADE", headerClassName: 'super-app-theme--header', width: 120 },
        { field: "complemento", headerName: "COMPLEMENTO", headerClassName: 'super-app-theme--header', width: 250 },
        { field: "cep", headerName: "CEP", headerClassName: 'super-app-theme--header', width: 120 },
        { field: "estado", headerName: "ESTADO", headerClassName: 'super-app-theme--header', width: 100 },
        { field: "name", headerName: "NOME", headerClassName: 'super-app-theme--header', width: 120 },
        {
            field: "acoes", type: "actions", headerName: "AÇÕES",
            width: 105,
            headerClassName: 'super-app-theme--header',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<AiFillEdit />}
                        label="Edit"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={() => editEnd(id)}
                    />,
                    <GridActionsCellItem
                        icon={<AiFillDelete />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={() => delet(id)}
                        color="inherit"
                    />,
                ];
            }
        }
    ]

    const { register, handleSubmit, watch } = useForm();



    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [rowCountState, setRowCountState] = useState()

    const dadosFiltro = useRef({})
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    })



    useEffect(() => {

        buscaNome(paginationModel.page)

    }, [paginationModel.page])


    const handlePagination = useCallback((pages) => {

        async function handle() {

            const addr = await api.get(`/endereco/${pages}`)

            console.log(addr.data)

            setRowCountState(addr.data.countEnd)

            setRows(addr.data.list)

            return
        }
        handle()
    }, [])


    const buscaNome = useCallback((page) => {


        async function request() {
            if(dadosFiltro.current.cep != undefined){
                const response = await api.get(
                    `/endereco/lista/page?nomeEnd=${dadosFiltro.current.nomeEnd}&bairro=${dadosFiltro.current.bairro}&numero=${dadosFiltro.current.numero}&cidade=${dadosFiltro.current.cidade}&cep=${dadosFiltro.current.cep}&estado=${dadosFiltro.current.estado}&name=${dadosFiltro.current.nome}&page=${page}`
                )
                setRows(response.data.list)
                setRowCountState(response.data.rowCount)
            }else{
                let nomeEnd = '', bairro = '', numero ='', cidade = '', cep='', estado='', nome=''
                const response = await api.get(
                    `/endereco/lista/page?nomeEnd=${nomeEnd}&bairro=${bairro}&numero=${numero}&cidade=${cidade}&cep=${cep}&estado=${estado}&name=${nome}&page=${page}`
                )
                setRows(response.data.list)
                setRowCountState(response.data.rowCount)

            }
        }
        request()
    }, [])

    const listEndereco = useCallback((page) => {

        async function request() {
            const response = await api.get(
                `/endereco/lista/page?nomeEnd=${dadosFiltro.current.nomeEnd}&bairro=${dadosFiltro.current.bairro}&numero=${dadosFiltro.current.numero}&cidade=${dadosFiltro.current.cidade}&cep=${dadosFiltro.current.cep}&estado=${dadosFiltro.current.estado}&name=${dadosFiltro.current.name}&page=${page}`
            )
            setRowCountState(response.data.rowCount)
            setRows(response.data.list)
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
                    buscaNome();
                }
            });
        }
        removEnd(id);
    }, [buscaNome]);

    const editEnd = useCallback((id) => {
        async function edit() {
            navigate(`/newEnd/${id}`)
        }
        edit()
    }, [])

    // useEffect(() => {

    //     buscaNome(paginationModel.page)

    // }, [])

    return (
        <>
            <Header />

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
                <form onSubmit={ handleSubmit((data)=>{
                    dadosFiltro.current = data
                    buscaNome(paginationModel.page)
                })}>
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

            <Conatiner>

                <Box
                    sx={{
                        padding: 1,
                        // height: 370,
                        width: '100%',
                        '& .super-app-theme--header': {
                            backgroundColor: 'rgba(140, 255, 0, 0.55)',

                        },
                    }}
                    className="chines"
                >

                    <DataGrid className="dataGrid"
                        sx={{
                            border: 'none',
                            borderRadius: `5px`,

                        }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },

                        }}
                        pageSizeOptions={[5, 10]}

                        rowCount={rowCountState}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={setPaginationModel}

                    />
                </Box>

            </Conatiner>
        </>
    )
}
