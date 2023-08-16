import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from "./styles";

import avatarPlaceholder from '../../assets/placeholder.png'
import { useAuth } from '../../hooks/auth'
import { api } from '../../service/api';
import { useNavigate } from 'react-router-dom';

export function Header() {
     const navigate = useNavigate();
     const { signOut, user } = useAuth();

     const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

     return (
          <Container>
               <Profile to="/profile">
                    <img src={avatarUrl}
                         alt="foto do Usuario" />
                    <div>
                         <span>Bem-Vindo</span>
                         <strong>{user.name}</strong>
                    </div>
               </Profile>
               <Logout onClick={() => {
                    signOut(navigate)
               }
               } >
                    <RiShutDownLine></RiShutDownLine>
               </Logout>
          </Container>
     )
}