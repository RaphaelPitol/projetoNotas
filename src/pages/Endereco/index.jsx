import { Link } from "react-router-dom"
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Header } from "../../components/Header"
import { Container } from "./style"

import { api } from "../../service/api";
import { useCallback, useEffect, useState } from "react";

export function Endereco() {

     const [endereco, setEndereco] = useState([])

     const listEndereco = useCallback(() => {
          async function request() {
               const response = await api.get('/endereco')
               setEndereco(response.data)
          }
          request()
     }, [])

     const delet = useCallback((id)=>{
          async function removEnd(id) {
              const confirm = window.confirm('Deseja realmente Excluir?')
              if (confirm) {
                  await api.delete(`/endereco/${id}`);
                  listEndereco()
              }
          }
          removEnd(id)
      },[])


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
                    display:"flex",
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

               <Container>


                    <table>
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
                         {
                              endereco.map(end => (
                                   <tr key={String(end.id)}>
                                        <td>{end.nomeEnd}</td>
                                        <td>{end.bairro}</td>
                                        <td>{end.numero}</td>
                                        <td>{end.cidade}</td>
                                        <td>{end.complemento}</td>
                                        <td>{end.cep}</td>
                                        <td>{end.estado}</td>
                                        <td>{end.name}</td>
                                        <td>

                                        <Link to="" className="edit"
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

                    </table>
               </Container>
          </>
     )
}