import { RawEventInfo } from "../components/pages/PagesInterface"
import IAllEvents from "./eventsInterface"
import SecretBox from "./secretbox"
class Events implements IAllEvents{
    allEvents: RawEventInfo
    privateKey: string
    constructor(privateKey: string, allEvents: RawEventInfo) {
        this.privateKey = privateKey
        this.allEvents = allEvents
    }

    decryptEvent = (event: string) => {
        const secretBox = new SecretBox(this.privateKey)
        return secretBox.decrypt(event)
    }

    unpackEvents = async () => {
        let myI = 0
        let invitedI = 0
        let invitedEvents: any[] = [];
        
        const myEvents = Promise.all(this.allEvents.myEvents.map(event => {
            if(event){
                const dEvent = this.decryptEvent(event)
                dEvent.index = myI
                myI += 1
                return dEvent
            }
            return undefined
        }));

        if(this.allEvents.invitedEvents){
            invitedEvents = await Promise.all(this.allEvents.invitedEvents.map(event => {
                if(event){
                    const dEvent = this.decryptEvent(event.encryptedEvent)
                    dEvent.index = invitedI
                    invitedI += 1
                    return {decryptedEvent: dEvent, accepted: event.accepted}
                }
                return undefined
            }));
        }

        return {myEvents: await myEvents, invitedEvents: invitedEvents}
    }
}

export default Events