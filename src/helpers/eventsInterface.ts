interface IAllEvents {
    allEvents?: {myEvents: string[];
            invitedEvents: string[];}
    privateKey: string
}

export interface IEvents {
    events: EventInfo[]
    setSelectedEvent: React.Dispatch<React.SetStateAction<[string, number]>>
}

export interface IEventDetails {
    event: EventInfo
}

export type EventInfo = {
    title: string,
    description: string,
    date: string,
    location:string,
    invitees: string[]

}

export type SelectedEvent = {
    selectedEvent: (string | number)[]
}

export type DecryptEvent = {
    myEvents: string[];
    invitedEvents: string[];
}

export default IAllEvents