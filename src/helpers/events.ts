import IEvents from "./eventsInterface"
import SecretBox from "./secretbox"
class Events implements IEvents{
    allEvents: {myEvents: string[];
            invitedEvents: string[];}
    privateKey: string
    constructor(privateKey: string, allEvents: {myEvents: string[]; invitedEvents: string[];} = {myEvents: [""], invitedEvents: [""]}) {
        this.privateKey = privateKey
        this.allEvents = allEvents
    }

    decryptEvent = (event: string) => {
        const secretBox = new SecretBox(this.privateKey)
        return secretBox.decrypt(event)
    }

    unpackEvents = () => {
        const decryptedEvents = {
            myEvents: [""],
            invitedEvents: [""]
        }
        this.allEvents.myEvents.forEach(event => {
            decryptedEvents.myEvents.push(this.decryptEvent(event))
        });
        this.allEvents.invitedEvents.forEach(event => {
            decryptedEvents.invitedEvents.push(this.decryptEvent(event))
        });
        return decryptedEvents
    }
}

export default Events