import { Container, Form, Avatar } from "./styles";

import { useState } from "react";
import { useAuth } from '../../hooks/auth'

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { api } from "../../service/api";

import avatarPlaceholder from '../../assets/placeholder.png'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';


export function Profile() {
     
     const { user, updateProfile } = useAuth();

     const [name, setName] = useState(user.name);
     const [email, setEmail] = useState(user.email);
     const [passwordOld, setPasswordOld] = useState();
     const [passwordNew, setPasswordNew] = useState();

     const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

     const [avatar, setAvatar] = useState(avatarUrl);
     const [avatarFile, setAvatarFile] = useState(null)

     async function handleUpdate() {
          const updated = {
               name,
               email,
               password: passwordNew,
               old_password: passwordOld
          }
          const userUpdated = Object.assign(user, updated)

          await updateProfile({ user:userUpdated, avatarFile })
    
     }


     function handleChangeAvatar(event){
          const file = event.target.files[0];
          setAvatarFile(file);

          const imagePreview = URL.createObjectURL(file);
          setAvatar(imagePreview);
     }


     return (
          <Container>
               <header>
                    <Link to="/">
                         <FiArrowLeft />
                    </Link>

               </header>

               <Form>
                    <Avatar>
                         <img src={avatar} alt="Foto do Usuario" />

                         <label htmlFor="avatar">
                              <FiCamera />
                              <input
                                   id="avatar"
                                   type="file"
                                   onChange={handleChangeAvatar}
                              />
                         </label>
                    </Avatar>



                    <Input
                         placeholder="Nome"
                         type="text"
                         icon={FiUser}
                         value={name}
                         onChange={e => setName(e.target.value)}
                    />
                    <Input
                         placeholder="Email"
                         type="email"
                         icon={FiMail}
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                         placeholder="Senha atual"
                         type="password"
                         icon={FiLock}
                         onChange={e => setPasswordOld(e.target.value)}
                    />
                    <Input
                         placeholder="Nova senha"
                         type="password"
                         icon={FiLock}
                         onChange={e => setPasswordNew(e.target.value)}
                    />

                    <Button title="Salvar" onClick={handleUpdate} />

               </Form>


          </Container>
     )
}