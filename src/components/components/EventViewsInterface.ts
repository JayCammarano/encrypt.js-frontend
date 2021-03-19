interface IEventViews {
    setWhichTab: React.Dispatch<React.SetStateAction<string>>
    selectedTab?: string,
    events?: {myEvents: string[];
            invitedEvents: string[];}
}

export default IEventViews