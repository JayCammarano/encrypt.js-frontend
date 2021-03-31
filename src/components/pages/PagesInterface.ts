import { EventInfo } from "../../helpers/eventsInterface"

interface IPages {
  setAuth: (boolean: boolean) => void;
}

export type RawUserInfo = {
    user:{
        user_name: string,
        secret_key: string,}
    events: RawEventInfo
}

export type RawEventInfo = {
    myEvents: string[],
    invitedEvents: RawInvitedEvent[]
}

export type RawInvitedEvent = {
    encryptedEvent: string
    accepted: boolean
}

export type UnpackedEventInfo = {
    myEvents: EventInfo[],
    invitedEvents: UnpackedInvitedEvent[]
    
}

export type UnpackedInvitedEvent = {
    decryptedEvent: EventInfo,
    accepted: boolean
    
}
export default IPages