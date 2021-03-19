interface IEvents {
    allEvents?: {myEvents: string[];
            invitedEvents: string[];}
    privateKey: string
}

export type EventInfo = {
    title: string,
    description: string,
    date: string,
    location:string,
    invitees: string[]

}


export default IEvents