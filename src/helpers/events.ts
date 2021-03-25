import IAllEvents from "./eventsInterface"
import SecretBox from "./secretbox"
class Events implements IAllEvents{
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

    unpackEvents = async () => {
        const myEvents = Promise.all(this.allEvents.myEvents.map(event => {
            if(event){
                const events = this.decryptEvent(event)
                return events
            }
            return {title: "Null", description: "null", date: "null", location: "null", invitees: ["null"]}
        }));

        const invitedEvents = Promise.all(this.allEvents.invitedEvents.map(event => {
            if(event){
                const events = this.decryptEvent(event)
                return events
            }
            return {title: "Null", description: "null", date: "null", location: "null", invitees: ["null"]}
        }));
        return {myEvents: await myEvents, invitedEvents: await invitedEvents}
    }
}

export default Events