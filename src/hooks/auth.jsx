//o UseContext e o createContext são hook, funções do react para que possamos usar nosso contexto

import { createContext, useContext, useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { api } from '../service/api'

const AuthContext = createContext({});
//O children sera as Rotas em nosso main
function AuthProvider({ children }) {
  //o useState preserva os dados entre as renderizações
  const [data, setData] = useState({});
  
  
  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password })
      
      // data é uma propriedade de axios
      const { user, token } = response.data;
 
      //localStorage armazena os dado no navegador do usuario
      // setItem função do localStorage recebe chave e valor
      // precisa transformar o Objeto vindo atravez do JSON em um texto (.stringify)
      localStorage.setItem("@blocoDeNotas:user", JSON.stringify(user));
      localStorage.setItem("@blocoDeNotas:token", token);


      //inserindo o token no cabeçario do de autorização
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user, token });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel conectar!")
      }
    }
  }
 
  function signOut(navigate) {
  
    Swal.fire({
      text: "Você realmente deseja sair?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero sair!',
      cancelButtonText: 'Cancelar'

    }).then((response) => {
      if (response.isConfirmed) {
        localStorage.removeItem("@blocoDeNotas:token");
        localStorage.removeItem("@blocoDeNotas:user");
        setData({});
      
       navigate('/')
      
      }
     
    });
   
  }

  async function updateProfile({ user, avatarFile }) {

    try {

      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@blocoDeNotas:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado!")

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possivel atualizar o perfil!")
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@blocoDeNotas:token");
    const user = localStorage.getItem("@blocoDeNotas:user");
  

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)//pegando o JSON em texto voltando atravez do parse um objeto 
      });
    }
    //este vetor estando vazio o useEffect aulializa somente uma vez.
  }, []);


  return (
    <AuthContext.Provider value={{ signIn, user: data.user, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
//o Hook começa com o padrão "useNomeDoHook"
function useAuth() {
  const context = useContext(AuthContext)
  return context;
}
export { AuthProvider, useAuth };
