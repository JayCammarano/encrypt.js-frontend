interface IAllEvents {
    allEvents?: {myEvents: string[];
            invitedEvents: string[];}
    privateKey: string
}

export interface IEvents {
    events: IEventDetails[]
    setSelectedEvent: React.Dispatch<React.SetStateAction<[string, number]>>
}

export interface IEventDetails {
    event: {title: string, 
            description: string, 
            date: string, 
            location: string, 
            invitees: string[], 
            index?: number
        }
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