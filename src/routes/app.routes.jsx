import {Routes, Route} from 'react-router-dom';

import { New } from '../pages/New';
import { Home } from '../pages/Home';
import { Details } from '../pages/Datails';
import { Profile } from '../pages/Profile';
import {Cars} from '../pages/Cars';
import { ListarCars } from '../pages/ListarCars';
import { Endereco } from '../pages/Endereco';
import { NewEnd } from '../pages/NewEnd';
import { Teste } from '../pages/Teste';



export function AppRoutes(){
     return(
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/new' element={<New/>}/>
               <Route path='/profile' element={<Profile/>}/>
               <Route path='/details/:id' element={<Details/>}/>
               <Route path='/cars/:id?' element={<Cars/>}/>
               <Route path='/lista' element={<ListarCars/>}/>
               <Route path='/endereco' element={<Endereco/>}/>
               <Route path='/newEnd/:id?' element={<NewEnd/>}/>
               <Route path='/teste' element={<Teste/>}/>
          </Routes>
     )

}
