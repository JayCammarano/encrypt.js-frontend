interface IAllEvents {
    allEvents?: {myEvents: string[];
            invitedEvents: string[];}
    privateKey: string
}

export interface IEvents {
    events: string[]
}

export interface IEventDetails {
    event: {title: string, description: string, date: string, location: string, invitees: string[]}

}
export type EventInfo = {
    title: string,
    description: string,
    date: string,
    location:string,
    invitees: string[]

}

export type DecryptEvent = {
    myEvents: string[];
    invitedEvents: string[];
}

export default IAllEvents