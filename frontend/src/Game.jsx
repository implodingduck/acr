import './Game.css'
import { useState, useEffect } from 'react'
import {BackendApi} from './BackendApi';
import Plots from './Plots.jsx'

export default function Game(){

    const api = new BackendApi();

    const[gamestate, setGamestate] = useState({})

    useEffect(() => {
        console.log(`initializing interval`);
        handleTest();
        const interval = setInterval(async () => {
          await handleTest();
        }, 10000);
      
        return () => {
          console.log(`clearing interval`);
          clearInterval(interval);
        };
      }, []);

    const handleTest = async (e) => {
        console.log("handleTest");
        let newGameState = await api.getGameState();
        setGamestate(newGameState)
    }

    return (
        <>
            <div>
                <p>This is the game</p>
                <button onClick={handleTest}>Call the API</button>
                <Plots plots={gamestate.plots} />
                <pre style={{textAlign: "left"}}>
                    { JSON.stringify(gamestate, null, 2) }
                </pre>
            </div>
        </>
    )
}