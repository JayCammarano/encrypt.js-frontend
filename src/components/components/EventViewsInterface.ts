import { UnpackedEventInfo } from "../pages/PagesInterface";

interface IEventViews {
    setWhichTab: React.Dispatch<React.SetStateAction<string>>
    selectedTab?: string,
    selectedEvent?: [string, number]
    setSelectedEvent: React.Dispatch<React.SetStateAction<[string, number]>>
    events?: UnpackedEventInfo
}

export default IEventViews