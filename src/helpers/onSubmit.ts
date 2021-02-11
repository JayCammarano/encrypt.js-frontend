import ISubmit from "./onSubmitInerface"
import fetch from "node-fetch"

class onSubmit implements ISubmit {
    body: object;
    postURL: string

    constructor( body: object, postURL: string){
        this.body = body;
        this.postURL = postURL
    }

    onSubmit = async () => {
        try {
            const response = await fetch(this.postURL,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.body)
            })

            const parseResponse =  await response.json()
            const token = parseResponse.token
            if(typeof token === 'string' ){
                localStorage.setItem("token", parseResponse.token)
            }
            return true
        } catch (err) {
            console.error(err.message)
            return false
        }
    }
}

export default onSubmit