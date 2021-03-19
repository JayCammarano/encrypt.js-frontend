import Events from "../../helpers/events"

const privateKey = "FB+p+ImF8B8NcrK8mCtBAcFaugaNo9Adl+ybMGuSDM0="
const events = {myEvents: ["mkzqITri3PmzaHOsSohU71J6C2l6Fpy5cu9V4Cn/ZaVO78h0ht7GHxJBIaDSDQNbh/N2GL3vrUS7fzbFV6Tejfd7R5+Dhxp2VvQoJTNKw4isqdXTaAOw/cQScmN4ducScM0f2WSZfjZOOajAgEw5jw/QVAD0vUrTD7blwvsDQPF6y6xNMzctfyzAqUdlIuqFSfsDLvd5sFAu9g=="],
                invitedEvents: ["mkzqITri3PmzaHOsSohU71J6C2l6Fpy5cu9V4Cn/ZaVO78h0ht7GHxJBIaDSDQNbh/N2GL3vrUS7fzbFV6Tejfd7R5+Dhxp2VvQoJTNKw4isqdXTaAOw/cQScmN4ducScM0f2WSZfjZOOajAgEw5jw/QVAD0vUrTD7blwvsDQPF6y6xNMzctfyzAqUdlIuqFSfsDLvd5sFAu9g=="]}
const eventHandler = new Events(privateKey, events)

it('decodes event objects', async () => {
    const plainTextEvents = eventHandler.unpackEvents()
    expect(plainTextEvents).toStrictEqual({"invitedEvents": ["", {"date": "string", "description": "string", "invitees": ["user1", "user2", "user3"], "location": "string", "title": "string"}], "myEvents": ["", {"date": "string", "description": "string", "invitees": ["user1", "user2", "user3"], "location": "string", "title": "string"}]})
})
it('decodes an event string', async () => {
    const plainTextEvents = eventHandler.decryptEvent("mkzqITri3PmzaHOsSohU71J6C2l6Fpy5cu9V4Cn/ZaVO78h0ht7GHxJBIaDSDQNbh/N2GL3vrUS7fzbFV6Tejfd7R5+Dhxp2VvQoJTNKw4isqdXTaAOw/cQScmN4ducScM0f2WSZfjZOOajAgEw5jw/QVAD0vUrTD7blwvsDQPF6y6xNMzctfyzAqUdlIuqFSfsDLvd5sFAu9g==")
    expect(plainTextEvents).toStrictEqual({"date": "string", "description": "string", "invitees": ["user1", "user2", "user3"], "location": "string", "title": "string"})
})