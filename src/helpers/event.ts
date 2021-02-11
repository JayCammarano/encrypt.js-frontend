import IEvent from "./eventInterface"
import {encrypt} from "./secretbox"

class Event implements IEvent {
    body: { title: string; description: string; date: string; location: string; invitees: string[] }

    constructor(body: { title: string; description: string; date: string; location: string; invitees: string[] }) {
        this.body = body
    }
    stripDupeInvitees = () => {
        let uniqueInvitees: string[] = []
        this.body.invitees.forEach((invitee: string) => {
            if(!uniqueInvitees.includes(invitee)){
                uniqueInvitees.push(invitee)
            }
        })
        return uniqueInvitees
    }
    
    newEventPrep = () => {
        const {title, description, date, location } = this.body

        try {
            const pk = localStorage.getItem("secret_key")
            if(typeof pk === 'string' ){
            const validInvitees = this.stripDupeInvitees()
            const validEvent = {
                "title": title,
                "description":  description,
                "date":  date,
                "location": location,
                "invitees":  validInvitees
                
            }
            return encrypt(validEvent, pk)
            }else{
                return false
            }
        } catch (error) {
            return false
        }
       
    }

}

export default Event