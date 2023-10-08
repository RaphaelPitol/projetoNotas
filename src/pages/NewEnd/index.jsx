import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { FiArrowLeft } from 'react-icons/fi'
import InputMask from "react-input-mask"
import { Span } from "../../components/Span";

import { toast } from 'react-toastify';

import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

import { addMascaraCep, removeMascaraCep } from "../../service/mascara";
import { api} from "../../service/api";
import { useCallback, useEffect, useState } from "react";


import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Container } from './styles'


export function NewEnd() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([])


    const schema = yup.object({
        nomeEnd: yup.string().required("Endereço é obrigatório!"),
        bairro: yup.string().required("Bairro é obrigatória!"),
        numero: yup.number().integer()
            .required("Informe o numero").positive("Informe o numero Positivo"),
        cidade: yup.string().required("Cidade é obrigatória!"),
        complemento: yup.string(),
        cep: yup.string()
            .required("Informe o Cep"),
        // .length(10, "O CEP deve ter 8 dígitos"),
        // .matches(/^\d+$/, "O CEP deve conter apenas números"),
        estado: yup.string().required("Estado é obrigatório!"),
        user_id: yup.string().required("Informe a pessoa!"),
    }).required();

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema)
    })


    const create = useCallback((e) => {
        console.log(e)
        async function createEnd(e) {
            if (!id) {
                try {
                    await api.post("/endereco", e)
                    Swal.fire(
                        'Salvo com Sucesso!',
                        'success'
                    )
                    // toast.success("Deu certo errado!",{
                    //     position: toast.POSITION.TOP_CENTER
                    // })
                    reset()
                    navigate("/endereco")
                } catch (error) {
                    if (error.response.data.message !== String) {
                        Swal.fire({
                            text:"Não foi possivel Salvar, Entre em contato com o Suporte!"
                        })
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
                await api.put("/endereco", e)
                Swal.fire(
                    'Editado com Sucesso!',
                    'success'
                )
                navigate("/endereco")
            }
        }

        createEnd(e)

    }, [])

    const update = useCallback(() => {
        async function up() {
            const end = await api.get(`/endereco/${id}`)

            setValue("id", end.data.id)
            setValue("nomeEnd", end.data.nomeEnd);
            setValue("bairro", end.data.bairro);
            setValue("cidade", end.data.cidade);
            setValue("numero", end.data.numero || "0000");
            setValue("complemento", end.data.complemento);
            setValue("cep", addMascaraCep(end.data.cep));
            console.log(end.data.cep)
            setValue("estado", end.data.estado)
            setValue("user_id", end.data.user_id);

        }
        up()

    }, [])



    useEffect(() => {
        async function listUsers() {
            const response = await api.get('/users')
            setUser(response.data)
            if (id) {
                update()
            }
        }
        listUsers()
    }, [])


    const chageCep = useCallback(async (cep) => {
        if (cep.length !== 10) return;

        const c = removeMascaraCep(cep);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${c}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setValue("nomeEnd", data.logradouro || "");
                setValue("bairro", data.bairro || "");
                setValue("cidade", data.localidade || "");
                setValue("estado", data.uf || "");
            } else {
                toast.error("CEP não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            toast.error("Erro ao buscar CEP.");
        }
    }, [setValue]);


    return (
        <>
            <Header></Header>

            <h1
                style={{
                    textAlign: "center",
                    margin: 15,
                }}
            >
                Cadastro de Endereço
            </h1>
            <div
                style={{
                    display: "flex",
                    margin: 10,
                    marginLeft: 100,
                    marginRight: 100,
                    justifyContent: "space-between"

                }}
            >
                <Link to="/endereco"
                    style={{
                        color: "white",
                        fontSize: 32
                    }}
                > <FiArrowLeft /></Link>
            </div>
            <Container>


                <div className="divForm">
                    <form className="form" onSubmit={handleSubmit(create)}>
                    <label htmlFor="">Cep</label>
                        <InputMask
                            mask={"99.999-999"}
                            alwaysShowMask={false}
                            maskPlaceholder=''
                            type={'text'}
                            placeholder="00.000-000"
                            onChangeCapture={e => chageCep(e.target.value)}
                            {...register("cep", { setValueAs: (c) => c === "" ? null : removeMascaraCep(c) })}
                        />

                        <Span>{errors.cep?.message}</Span>


                        <label htmlFor="">Endereço</label>
                        <input type="text"
                            {...register("nomeEnd")}
                        />
                        <Span>{errors.nomeEnd?.message}</Span>


                        <label htmlFor="">Bairro</label>
                        <input type="text"
                            {...register("bairro")}
                        />
                        <Span>{errors.bairro?.message}</Span>

                        <label htmlFor="">Numero</label>
                        <input type="number"
                            {...register("numero", { setValueAs: (n) => n === "" ? null : n })}
                        />
                        <Span>{errors.numero?.message}</Span>

                        <label htmlFor="">Cidade</label>
                        <input type="text"
                            {...register("cidade")}
                        />
                        <Span>{errors.cidade?.message}</Span>

                        <label htmlFor="">Complemento</label>
                        <input type="text"
                            {...register("complemento")}
                        />

                        <label htmlFor="">Estado</label>
                        <select className="estado"
                            {...register("estado")}
                            id="">
                            <option value="">--</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                        </select>

                        <Span>{errors.estado?.message}</Span>

                        <label htmlFor="">Nome</label>
                        <select className="user"
                            {...register("user_id")}
                        >
                            <option value="">Nome...</option>
                            {
                                user.map(users => (
                                    <option
                                        key={String(users.id)}
                                        value={users.id}
                                    >{users.name}</option>
                                ))
                            }
                        </select>
                        <Span>{errors.user_id?.message}</Span>

                        <div className="divButton">

                            <Button type="submit"
                                title="Salvar"
                            />
                        </div>

                    </form>
                </div>
            </Container>
        </>
    );
}
