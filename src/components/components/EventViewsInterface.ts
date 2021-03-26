import { EventInfo } from "../../helpers/eventsInterface";

interface IEventViews {
    setWhichTab: React.Dispatch<React.SetStateAction<string>>
    selectedTab?: string,
    selectedEvent?: [string, number]
    setSelectedEvent: React.Dispatch<React.SetStateAction<[string, number]>>

    events?: {myEvents: EventInfo[];
            invitedEvents: EventInfo[];}
}

export default IEventViews