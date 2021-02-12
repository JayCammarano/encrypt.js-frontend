import onSubmit from "../../helpers/onSubmit"


it('submits the new user', async () => {
    const body = {
        username: "",
        password: ""
    }
    const signInURL = 'http://localhost:1337/auth/signin'
    const submitter = new onSubmit(body, signInURL)
    expect(await submitter.onSubmit()).toBe(true)
})