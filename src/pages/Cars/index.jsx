import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'
import { useEffect, useState } from "react"


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

    function createCar() {
        if (!nome || !marca || !ano_fabricacao || !userId) {
            return alert("Preencha todos os Campos!")
        }
        api.post("/cars", { nome, marca, ano_fabricacao, user_id: userId })
        alert("Gravado com sucesso!")

    }

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

            <Form>
                <label htmlFor="">Nome</label>
                <input
                    type="text"
                    onChange={e => setNome(e.target.value)}
                />
                <label htmlFor="">Marca</label>
                <input
                    type="text"
                    onChange={e => setMarca(e.target.value)}
                />
                <label htmlFor="">Ano</label>
                <input
                    type="number"
                    onChange={e => setData(e.target.value)}
                />
                <select
                    value={userId}
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

                <button onClick={createCar}>Gravar</button>
            </Form>
        </Container>
    )
}