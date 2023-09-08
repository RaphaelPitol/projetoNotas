import {Routes, Route} from 'react-router-dom';

import { New } from '../pages/New';
import { Home } from '../pages/Home';
import { Details } from '../pages/Datails';
import { Profile } from '../pages/Profile';
import {Cars} from '../pages/Cars';
import { ListarCars } from '../pages/ListarCars';


export function AppRoutes(){
     return(
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/new' element={<New/>}/>
               <Route path='/profile' element={<Profile/>}/>
               <Route path='/details/:id' element={<Details/>}/>
               <Route path='/cars' element={<Cars/>}/>
               <Route path='/lista' element={<ListarCars/>}/>
          </Routes>
     )

}