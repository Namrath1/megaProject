import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import {login, logout} from "./store/authStore"

function App() {
 const [loading, setloading] = useState(true);
 const dispatch = useDispatch()

 useEffect(() => {
  authService.getCurrentUser()
  .then((user)=>{
    if(user){
      dispatch(login({user}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=>{setloading(false)})
 }, []);

  return !loading ? (<div className="min-h-screen flex flex-wrap text-center bg-gray-400">
   <div className="w-full block ">
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
   </div>
  </div>): (null)
  
}

export default App
