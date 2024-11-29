import './App.css'
import { useEffect } from 'react'
import { useAuth } from "react-oidc-context";
import Game from './Game.jsx'

function App() {
  const auth = useAuth();

  useEffect(() => {
    // the `return` is important - addAccessTokenExpiring() returns a cleanup function
    return auth.events.addAccessTokenExpiring(() => {
        console.log("You're about to be signed out due to inactivity. Press continue to stay signed in.")
        auth.signinSilent();
    })
    }, [auth.events, auth.signinSilent]);


  switch (auth.activeNavigator) {
      case "signinSilent":
          return <div>Signing you in...</div>;
      case "signoutRedirect":
          return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
      return <div>Loading...</div>;
  }

  if (auth.error) {
      return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
      return (
      <div>
          <button onClick={() => void auth.removeUser()}>Log out</button>
          <p>Hello {auth.user?.profile.preferred_username}{" "}</p>
          <hr />
          <Game />

          
      </div>
      );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;