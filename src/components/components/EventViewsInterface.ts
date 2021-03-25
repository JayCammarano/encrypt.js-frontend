import { IEventDetails } from "../../helpers/eventsInterface";

interface IEventViews {
    setWhichTab: React.Dispatch<React.SetStateAction<string>>
    selectedTab?: string,
    events?: {myEvents: IEventDetails[];
            invitedEvents: IEventDetails[];}
}

export default IEventViews