import onSubmit from "../../helpers/onSubmit"


it('submits the new user', async () => {
    const body = {
        username: "",
        password: ""
    }
    const signInURL = process.env.REACT_APP_API_URL + '/auth/signin'
    const submitter = new onSubmit(body, signInURL)
    expect(await submitter.onSubmit()).toBe(true)
})