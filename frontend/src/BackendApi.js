import { useAuth } from 'react-oidc-context';

class BackendApi {
    baseurl;
    auth;

    constructor() {
        this.baseurl = import.meta.env.VITE_BASE_URL
        this.auth = useAuth();
    }

    async callApi(path, method='GET', data={}){
        const response = await fetch(`${this.baseurl}${path}`, {
            method: method,
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${this.auth.user.access_token}`
            },
            data: data
        });
        console.log(response)
        const json = await response.json();
        return json;
    }

    async getGameState(){
        // const response = await fetch(`${this.baseurl}/game/api/state`, {
        //     headers: {
        //         "content-type": "application/json",
        //         "Authorization": `Bearer ${this.auth.user.access_token}`
        //     }
        // });
        // const json = await response.json();
        // return json;
        return await this.callApi("/game/api/state")
    }

    async test(){
        console.log(this.auth.user)
    }

    async collectPlot(id){
        console.log(`backendAPI collect plot: ${id}`)
        return await this.callApi(`/game/api/plots/${id}/collect`, "POST", {})
    }
}


export { BackendApi }