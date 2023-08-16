import { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import { api } from "../../service/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles";


export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignup() {

    if (!name || !email || !password) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Preencha todos os campos!',
        footer: '<a href="">Quer prosseguir?</a>'
      })
    }

    api.post("/users", { name, email, password })
      .then(() => {
        Swal.fire(
          'Cadastrado com Sucesso!',
          'success'
        )
        navigate("/");
      })
      .catch(error => {
        if (error.response) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: (error.response.data.message)
          })
        } else {
          alert("Não foi possivel Cadastrar!")
        }
      })

  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Projeto Notas</h1>
        <p>Aplicação para salvar e genciar seus links úteis.</p>

        <h2>Crie sua conta</h2>
        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}

        />

        <Button title="Cadastrar" onClick={handleSignup} />

        <Link to="/">Voltar para Login</Link>
      </Form>
    </Container>
  );
}
