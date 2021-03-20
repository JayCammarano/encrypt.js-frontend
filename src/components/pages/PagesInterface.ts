interface IPages {
  setAuth: (boolean: boolean) => void;
}

export type MyEvents = {
    user:{
        user_name: string,
        secret_key: string,}
    events: {
              myEvents: string[],
              invitedEvents: string[]
            }
}
export default IPages