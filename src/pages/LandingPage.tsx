import React, {Fragment} from 'react'
interface ILandingPage {
  loginStatus: string
}

const LandingPage: React.FC<ILandingPage> = () => {

    return (
        <Fragment>
        <section className="p-4 m-4 mb-6 text-gray-700 body-font">
        <div className="container flex-row">
            <button
              className="flex flex-row float-right px-2 py-2 ml-4 text-xs bg-white border-2 border-black rounded text-md focus:outline-none hover:bg-gray-300"
              type="button"
            >
              Sign Up
            </button>
            <button
              className="flex flex-row float-right px-2 py-2 ml-4 text-xs text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back"
              type="button"
            >
              Sign In
            </button>
        </div>
        <div className="container flex flex-col items-center px-4 py-6 mx-auto border-2 border-black rounded sm:py-12 md:py-24 md:flex-row">
          <div className="flex flex-col items-center mb-12 ml-4 text-center lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
            <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
              Secure Events Manager
            </h1>
            <p className="mb-8 leading-relaxed">
            Since the origin of this country gatherings have been target by both law enforcement and opposing hate groups. Recently, the Black Lives Matter movement has been especially targeted by these groups. By creating a private, encrypted event manager users will be able to create events without the knowledge of these oppressive forces.
            </p>
            <div className="flex justify-center">
               <button
                  className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-500 border-0 rounded focus:outline-none hover:bg-gray-300"
                  type="button"
                >
                  Learn More
                </button>
                <button
                  className="inline-flex px-6 py-2 ml-4 text-lg text-white bg-black border-0 rounded focus:outline-black hover:bg-white hover:border-black hover:text-black hover:outline-back"
                  type="button"
                >
                  Sign Up
                </button>
            </div>
          </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2"></div>
        </div>
      </section>
      <section>
          <div className="flex flex-col items-center ml-12 text-center b-12 md:mb-16 lg:flex-grow md:w-1/2 md:items-start md:text-left">
            <div><h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
              Organize Events With Ease
            </h1>
            <p className="mb-8 leading-relaxed">
              Maybe we should do borders around each feature instead of the
              whole walkthrough being one border. This image could be of just
              this one feature.
            </p>
            </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
            <img
              className="object-cover object-center w-full h-full rounded shadow"
              alt="spacefiller"
              src=""
              />
          </div>
          </div>
      </section>
      <section>
        <div className="flex text-right flex-col mr-12 b-12 md:mb-16 lg:flex-grow md:items-end md:text-end">
        <div className="w-1/2 float-left lg:max-w-lg lg:w-full md:w-1/2">
          <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            Keep Track of Upcoming Events
          </h1>
          <p className="mb-8 leading-relaxed">
            Maybe we should do borders around each feature instead of the
            whole walkthrough being one border. This image could be of just
            this one feature.
          </p>
          </div>
          <div className="w-1/2 float-right lg:max-w-lg lg:w-full md:w-1/2">
            <img
              className="object-cover object-center w-full h-full rounded shadow"
              alt="spacefiller"
              src=""
            />
        </div>
        </div>           
      </section>

      <section className="text-gray-700 body-font">
      <div className="container flex flex-col items-center px-4 py-6 mx-auto border-2 border-black rounded sm:py-12 md:py-24 md:flex-row">
          <div className="flex flex-col items-center mb-12 ml-4 text-center lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
            
            <h1 className="mb-4 text-3xl font-medium leading-tight text-gray-900 title-font sm:text-4xl">
            How it works:
            </h1>
            <p className="mb-8 leading-relaxed">
              On a higher level, the project encrypts the event data from the frontend client to send to the backend to store in the database, and then it re-encrypts it in a way that the client can unencrypt.
            </p>
            <h4 className="mb-4 text-2xl font-medium leading-tight text-gray-900 title-font sm:text-2xl">
              The Specifics:
            </h4>            
              <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
              <img
                  className="object-cover object-center w-full h-full rounded shadow"
                  alt="libsodium"
                  src={require("../assets/images/libsodium.png")}
                />
             </div>
            <p className="mb-8 leading-relaxed">
              The project takes advantage of the open-source, audited libsodium encryption library. It uses the symmetric “Secret Box” method.
            </p>
              <h5 className="mb-4 text-xl font-medium leading-tight text-gray-900 title-font sm:text-xl">
              Overview of the Secret Box:</h5>

              <p className="mb-8 leading-relaxed">
                Symmetrical encryption system that uses only a private key and a nonce to encrypt a message. A nonce is a one-time use random string that is unique to each message.</p>
                User A encrypts the message with their private key. 
                They then decrypt the message with the nonce and the private key



              <h5 className="mb-4 text-xl font-medium leading-tight text-gray-900 title-font sm:text-xl">
              Implementation:</h5>
              <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
                <img
                  className="object-cover object-center w-full h-full rounded shadow"
                  alt="tweetncal"
                  src={require("../assets/images/tweetncal.png")}
                />
              </div>

              <p className="mb-8 leading-relaxed">

              On sign up the backend generates a private key for the user. This is encoded to a Base64 string to store in the database. This is done on the backend to prevent man in the middle attacks from accessing unencrypted keys.
              When the user creates an event the client encrypts the event using their private key and unique nonce. This is encoded to Base64 with the nonce.
              Slide: decryption and encryption. Then when an invite recipient logs in the backend decodes the event and reencodes it with the recipient’s private key and a newly generated nonce. 
              </p>

              <h5 className="mb-4 text-xl font-medium leading-tight text-gray-900 title-font sm:text-xl">
              Points of Trust:</h5>
              <p className="mb-8 leading-relaxed">

              Using this method I have to trust that the following are uncompromised:
              </p>
              <ol>
                <li>
              The Server</li>
              <li>The User and their login information</li>
              <li>The Server</li>
              <li>The Username list</li></ol>
              <p className="mb-8 leading-relaxed">

              If the user login is compromised the bad actor will be able to access events they are invited to as well as create a bait event. The event would only be able to be shared with usernames known to the bad actor, which does limit its impact somewhat though.
              </p>
          </div>
          <div className="object-cover object-center w-5/6 rounded shadow lg:max-w-lg lg:w-full md:w-1/2">
            <img
              className="object-cover object-center w-full h-full rounded shadow"
              alt="space filler"
              src=""
            />
          </div>
        </div>
        <div className="container flex flex-col items-center px-4 mx-auto my-6 sm:py-12 md:py-24 md:flex-row">
          </div>

          </section>

        </Fragment>
    )
}

export default LandingPage
