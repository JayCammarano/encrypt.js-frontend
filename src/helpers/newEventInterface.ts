interface INewEvent {
    body: { title: string; description: string; date: string; location: string; invitees: string[] },
    privateKey: string
}

export default INewEvent