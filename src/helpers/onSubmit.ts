import ISubmit from "./onSubmitInerface"
import fetch from "node-fetch"

class onSubmit implements ISubmit {
    body: object;
    postURL: string
    token: string

    constructor( body: object, postURL: string, token: string = "undefined"){
        this.body = body;
        this.postURL = postURL
        this.token = token
    }

    onSubmit = async () => {
        try {
            console.log(this.token)
            const response = await fetch(this.postURL,{
                method: "POST",
                headers: {"Content-Type": "application/json",
                        token: this.token},
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