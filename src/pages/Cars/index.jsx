import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'
import { useState } from "react"


import { api } from "../../service/api";

import { Header } from "../../components/Header"
import { Container } from "./styles"
import { Form } from "./styles"



export function Cars() {
    const [nome, setNome] = useState("")
    const [marca, setMarca] = useState("")
    const [ano_fabricacao, setData] = useState("")

    function createCar() {

       
        if (!nome || !marca || !ano_fabricacao) {
            return alert("Preencha todos os Campos!")
        }
        api.post("/cars", { nome, marca, ano_fabricacao })
        alert("Gravado com sucesso!")

    }

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
                style={{
                    color: "white",
                    fontSize: 30,
                    display: 'flex',
                    justifyContent: "space-between"
                }}
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

                <button onClick={createCar}>Gravar</button>
            </Form>
        </Container>
    )
}