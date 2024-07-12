import { useState } from 'react'
import './App.css'
import { UserContext } from './UserContext';
import Login from './Login.jsx'
import { jwtDecode } from "jwt-decode";


function App() {
  const [user, setUser] = useState(null);

  const isUserLoggedIn = () => {
    return !!user;
  }

  const handleDoStuff = async (e) => {
    const response = await fetch("http://localhost:8000/game/users/", {
      headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${user.access}`
      }
    });
    const json = await response.json();
    console.log(json);
  }

  return (
    <>
      <div>
        <UserContext.Provider value={{user, setUser, isUserLoggedIn}}>
          { isUserLoggedIn() ?
            <div><pre>{jwtDecode(user.access).name}</pre> <button onClick={handleDoStuff}>Do stuff!</button></div>
            : 
            <Login />
          }
        </UserContext.Provider>
      </div>  
    </>
  )
}

export default App
