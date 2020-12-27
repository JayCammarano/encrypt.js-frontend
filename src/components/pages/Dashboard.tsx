import React, {Fragment} from 'react'
interface IDashboard {
    setAuth: (boolean: boolean) => void
}
const Dashboard: React.FC<IDashboard> = () => {
    return (
        <Fragment>
           <h1>Dashboard</h1>     
        </Fragment>
    )   
}

export default Dashboard
