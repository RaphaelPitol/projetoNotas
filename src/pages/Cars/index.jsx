import { Link, useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'
import { useEffect, useState, useCallback } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2'


import { api } from "../../service/api";

import { Header } from "../../components/Header"
import { Container } from "./styles"
import { Form } from "./styles"

export function Cars() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([])

    const schema = yup.object({
        nome: yup.string().required("Nome é obrigatório!"),
        marca: yup.string().required("Marca é obrigatória!"),
        ano_fabricacao: yup.number().integer()
            .required("Informe o ano de fabricação").positive("Informe o ano Positivo"),
        user_id: yup.string().required("Informe o Proprietario"),
    }).required();

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const update = useCallback(() => {
        async function up() {
            const cars = await api.get(`/cars/${id}`)
            setValue("id", cars.data.id)
            setValue("nome", cars.data.nome);
            setValue("marca", cars.data.marca);
            setValue("ano_fabricacao", cars.data.ano_fabricacao || "0000");
            setValue("user_id", cars.data.user_id);
        }
        up()

    }, [])


    const create = useCallback((e)=>{
        async function createCar(e) {

            if (!id) {
                try {
                    await api.post("/cars", e)
                    Swal.fire(
                        'Salvo com Sucesso!',
                        'success'
                    )
                    reset()
                } catch (error) {
                    if (error.response) {
                        alert('Erro do servidor:', error.response.data);
                    } else if (error.request) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Servidor não respondeu!',
                            footer: '<a href="">Tente mais tarde!</a>'
                        })
                    }

                }
            }

            if (id) {
                await api.put("/cars", e)
                Swal.fire(
                    'Editado com Sucesso!',
                    'success'
                )
                navigate("/lista")
            }

        }
        createCar(e)

    },[])



    useEffect(() => {
        async function listUsers() {
            const response = await api.get('/users')
            setUser(response.data)
            if(id)update()
        }
        listUsers()
    }, [])

    return (
        <Container>

            <Header />

            <h1
                style={{
                    textAlign: "center",
                    marginTop: 50,
                }}
            >Cadastro de Carros</h1>


            <div

            >
                <Link to="/"
                    style={{
                        color: "white"
                    }}
                > <FiArrowLeft /></Link>
                <Link to="/lista"
                    style={{
                        color: "white"
                    }}
                >Listar</Link>

            </div>

            <Form onSubmit={handleSubmit(create)}>
                <label htmlFor="">Nome
                    <input
                        type="text"
                        {...register("nome")}
                    />
                    <span>{errors.nome?.message}</span>
                </label>
                <label htmlFor="">Marca
                    <input
                        type="text"
                        {...register("marca")}
                    />
                    <span>{errors.marca?.message}</span>
                </label>
                <label htmlFor="">Ano
                    <input
                        type="number"

                        {...register("ano_fabricacao", {
                            setValueAs: (ano) => ano === "" ? null : ano
                        })}
                    />
                    <span>{errors.ano_fabricacao?.message}</span>
                </label>
                <select
                    {...register("user_id")}
                >
                    <option value="" >Proprietario...</option>
                    {
                        user.map(users => (
                            <option
                                key={String(users.id)}
                                value={users.id}
                            >{users.name}</option>
                        ))
                    }
                </select>
                <span>{errors.user_id?.message}</span>

                <button>Gravar</button>
            </Form>
        </Container>
    )
}
