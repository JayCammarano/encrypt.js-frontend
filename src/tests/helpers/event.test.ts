import Event from "../../helpers/event"


const body = {
title: "string",
description: "string",
date: "string",
location: "string",
invitees: ["user1", "user2", "user3", "user3"],
}
const eventObject = new Event(body)
it('removes duplicate invitees', async () => {
    const uniqueInvitees = await eventObject.stripDupeInvitees()
    expect(uniqueInvitees).toStrictEqual(["user1", "user2", "user3"])
})