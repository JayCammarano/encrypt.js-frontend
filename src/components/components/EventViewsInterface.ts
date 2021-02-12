interface IEventViews {
    setWhichTab: React.Dispatch<React.SetStateAction<string>>
    selectedTab?: string,
    events?: object
}

export default IEventViews