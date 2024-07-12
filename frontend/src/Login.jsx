import './Login.css'
import { useState, useContext } from 'react'
import { UserContext } from './UserContext'

export default function Login(props) {

    const {user, setUser, isUserLoggedIn} = useContext(UserContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        const response = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "content-type": "application/json"
            }
        });
        const json = await response.json();
        console.log(json);
        setUser(json)
    }

    return (<fieldset>
        <legend>Login</legend>
        <label>User: <input type="text" onChange={ (e) => { setUsername(e.target.value) }} value={username} /></label>
        <label>Password: <input type="password" onChange={ (e) => { setPassword(e.target.value) }} value={password}  /></label>
        <button onClick={handleLogin}>Login</button>
      </fieldset>)
}