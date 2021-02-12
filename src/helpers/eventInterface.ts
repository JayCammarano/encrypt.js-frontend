interface IEvent {
    body: { title: string; description: string; date: string; location: string; invitees: string[] },
    privateKey: string
}

export default IEvent