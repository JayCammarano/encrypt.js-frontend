import NewEvent from "../../helpers/newEvent"


const body = {
title: "string",
description: "string",
date: "string",
location: "string",
invitees: ["user1", "user2", "user3", "user3"],
}

const privateKey = "FB+p+ImF8B8NcrK8mCtBAcFaugaNo9Adl+ybMGuSDM0="
const eventObject = new NewEvent(body, privateKey)
it('removes duplicate invitees', async () => {
    const uniqueInvitees = await eventObject.stripDupeInvitees()
    expect(uniqueInvitees).toStrictEqual(["user1", "user2", "user3"])
})

it('returns an encryted string', () => {
    const encryptedEvent = eventObject.newEventPrep()
    expect(typeof encryptedEvent).toBe('string')
})
