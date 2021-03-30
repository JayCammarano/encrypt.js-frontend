import IAllEvents from "./eventsInterface"
import SecretBox from "./secretbox"
class Events implements IAllEvents{
    allEvents: {myEvents: string[];
            invitedEvents: string[];}
    privateKey: string
    constructor(privateKey: string, allEvents: {myEvents: string[]; invitedEvents: string[];}) {
        this.privateKey = privateKey
        this.allEvents = allEvents
    }

    decryptEvent = (event: string) => {
        const secretBox = new SecretBox(this.privateKey)
        return secretBox.decrypt(event)
    }

    unpackEvents = async () => {
        let myI = 0
        let invI = 0
        const myEvents = Promise.all(this.allEvents.myEvents.map(event => {
            if(event){
                const dEvent = this.decryptEvent(event)
                dEvent.index = myI
                myI += 1
                return dEvent
            }
            return undefined
        }));

        const invitedEvents = Promise.all(this.allEvents.invitedEvents.map(event => {
            if(event){
                const dEvent = this.decryptEvent(event)
                dEvent.index = invI
                invI += 1
                return dEvent
            }
            return undefined
        }));
        return {myEvents: await myEvents, invitedEvents: await invitedEvents}
    }
}

export default Events