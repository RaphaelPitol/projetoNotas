import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from 'sweetalert2'


import { api } from "../../service/api";

import { Header } from "../../components/Header"
import { Container } from "./styles"
import { Form } from "./styles"



export function Cars() {
    const [nome, setNome] = useState("")
    const [marca, setMarca] = useState("")
    const [ano_fabricacao, setData] = useState("")
    const [user, setUser] = useState([])
    const [userId, setUserId] = useState("")


    const schema = yup.object({
        nome: yup.string().required("Nome é obrigatório!"),
        marca: yup.string().required("Marca é obrigatória!"),
        ano_fabricacao: yup.number().positive("Informe um numero positivo")
        .integer().required("Informe o ano de fabricação"),
        proprietario: yup.number().integer().required(),
    }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


     function createCar() {
    //     if (!nome || !marca || !ano_fabricacao || !userId) {
    //         return Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'Preencha todos os campos!',
    //             footer: '<a href="">Quer prosseguir?</a>'
    //           })
    //     }
         api.post("/cars", { nome, marca, ano_fabricacao, user_id: userId })
          alert("Gravado com sucesso!")

     }

    const onSubmit = data => console.log(data)
    console.log(errors)


    useEffect(() => {
        async function listUsers() {
            const response = await api.get('/users')
            setUser(response.data)

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

            <Form onSubmit={handleSubmit(createCar)}>
                <label htmlFor="">Nome
                    <input
                        type="text"
                        {...register("nome")}
                        onChange={e => setNome(e.target.value)}
                    />
                    <span>{errors.nome?.message}</span>
                </label>
                <label htmlFor="">Marca
                <input
                    type="text"
                    {...register("marca")}
                    onChange={e => setMarca(e.target.value)}
                />
                    <span>{errors.marca?.message}</span>
                </label>
                <label htmlFor="">Ano
                <input
                    type="number"
                    defaultValue={'0000'}
                    {...register("ano_fabricacao")}
                    onChange={e => setData(e.target.value)}
                />
                    <span>{errors.ano_fabricacao?.message}</span>
                </label>
                <select
                    value={userId}
                    {...register("proprietario")}
                    onChange={e => setUserId(e.target.value)}
                >
                    <option value="">Proprietario...</option>
                    {
                        user.map(users => (
                            <option
                                key={String(users.id)}
                                value={users.id}
                            >{users.name}</option>
                        ))

                    }

                </select>

                <button>Gravar</button>
            </Form>
        </Container>
    )
}