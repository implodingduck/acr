class BackendApi {
    baseurl;
    user;

    constructor(user) {
        this.baseurl = import.meta.env.VITE_BASE_URL
        this.user = user
    }

    async listUsers(){
        const response = await fetch(`${this.baseurl}/game/users/`, {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${this.user.access}`
            }
        });
        const json = await response.json();
        return json;
    }

    async test(){
        console.log("todo")
    }
}


export { BackendApi }