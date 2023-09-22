import { Header } from "../../components/Header"
import { Container } from "./style"

import { api } from "../../service/api";
import { useCallback, useEffect, useState } from "react";

export function Endereco() {

     const [endereco, setEndereco] = useState([])

     console.log(endereco)

     const listEndereco = useCallback(() => {
          async function request() {
               const response = await api.get('/endereco')
               setEndereco(response.data)
          }
          request()
     }, [])


     useEffect(() => {
          listEndereco()
     }, [])


     return (

          <>
               <Header></Header>

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
                                   </tr>
                              ))
                         }

                    </table>
               </Container>
          </>
     )
}