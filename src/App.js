import Navbar from './Components/Navbar/navbar';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { LoginSignUp } from './Pages/LoginSignUp';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Shop/>}/>
        <Route path='/product' element = {<Product/>}>
          <Route path=':productId' element = {<Product/>}/>
        </Route>
        <Route path='/login' element = {<LoginSignUp/>}/>
        


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
