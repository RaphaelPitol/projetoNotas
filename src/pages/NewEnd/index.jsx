import { Header } from "../../components/Header";
import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

export function NewEnd() {
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
      <form className="form" action="">
        <label htmlFor="">Endereço</label>
        <input type="text" />
        <label htmlFor="">Bairro</label>
        <input type="text" />
        <label htmlFor="">Numero</label>
        <input type="text" />
        <label htmlFor="">Cidade</label>
        <input type="text" />
        <label htmlFor="">Complemento</label>
        <input type="text" />
        <label htmlFor="">Cep</label>
        <input type="text" id="cep" name="cep" placeholder="XXXXX-XXX" pattern="\d{5}-\d{3}" required/>
        <label htmlFor="">Estado</label>
        <select className="estado" id="">
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
        <label htmlFor="">Nome</label>
        <select className="user">
          <option value="">Nome...</option>
          <option value="">Teste</option>
        </select>

      </form>
    </>
  );
}
