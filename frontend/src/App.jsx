import { useState } from 'react'
import './App.css'
import { UserContext } from './UserContext';
import Login from './Login.jsx'
import { jwtDecode } from "jwt-decode";
import {BackendApi} from './BackendApi';

function App() {

  const [user, setUser] = useState(null);
  const api = new BackendApi(user);

  const isUserLoggedIn = () => {
    return !!user;
  }

  const handleDoStuff = async (e) => {
    // const response = await fetch("http://localhost:8000/game/users/", {
    //   headers: {
    //       "content-type": "application/json",
    //       "Authorization": `Bearer ${user.access}`
    //   }
    // });
    // const json = await response.json();
    // console.log(json);
    let retval = await api.listUsers()
    console.log(retval)
  }

  const handleTest = async (e) => {
    await api.test()
  }

  return (
    <>
      <div>
        <UserContext.Provider value={{user, setUser, isUserLoggedIn}}>
          { isUserLoggedIn() ?
            <div>
              <pre>{jwtDecode(user.access).name}</pre>
              <button onClick={handleDoStuff}>Do stuff!</button>
              <button onClick={handleTest}>Test</button>
            </div>
            : 
            <Login />
          }
        </UserContext.Provider>
      </div>  
    </>
  )
}

export default App
