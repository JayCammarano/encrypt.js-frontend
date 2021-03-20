import INewEvent from "./newEventInterface"
import SecretBox from "./secretbox"

class NewEvent implements INewEvent {
    body: { title: string; description: string; date: string; location: string; invitees: string[] }
    privateKey: string

    constructor(body: { title: string; description: string; date: string; location: string; invitees: string[] }, privateKey: string) {
        this.body = body
        this.privateKey = privateKey
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
        const secretBox = new SecretBox(this.privateKey)
        const { title, description, date, location } = this.body
        try {
            const validInvitees = this.stripDupeInvitees()
            const validEvent = {
                "title": title,
                "description":  description,
                "date":  date,
                "location": location,
                "invitees":  validInvitees
            }
            return secretBox.encrypt(validEvent)
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default NewEvent