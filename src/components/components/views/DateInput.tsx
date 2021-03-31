import React, { ChangeEvent, useState } from 'react';
import { toast } from "react-toastify";
import { EventInfo } from '../../../helpers/eventsInterface';
interface IDateInput {
    date: EventInfo
    setDate: React.Dispatch<React.SetStateAction<EventInfo>>
}

const DateInput: React.FC<IDateInput> = ({date, setDate}) => {
    const [tempDate, setTempDate] = useState({year: "2021", month: "", day: "", time: "00:00"})

    const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if(e.target.value === '' || re.test(e.target.value)) {
            setTempDate({ ...tempDate, [e.target.name]: e.target.value });
            setDate({...date, unformatedDate: tempDate})
            
        }else{
            toast.warn("Numbers only")         
        }
    };
    const onChangeTime = (e: ChangeEvent<HTMLInputElement>)  => {
        setTempDate({ ...tempDate, [e.target.name]: e.target.value });

    }
    const onBlurTime = (e: ChangeEvent<HTMLInputElement>) => {
        const re = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
        if(e.target.value === '' || re.test(e.target.value)) {
            setDate({...date, unformatedDate: tempDate})
            
        }else{
            toast.warn("Time should be numbers only and format 23:00")         
        }
    }
    return (
        <div className="w-full"> 
        <h5>Date: (YYYY-MM-DD)</h5>
        <div className="m-2">
            <label htmlFor="year">
                <input name="year" className="w-16 " id="year" type="text"  maxLength={4} placeholder="YYYY" value={tempDate.year} onChange={onChangeInputs}/>- 
            </label>
            <label htmlFor="month">
                <input className="w-9" name="month" id="month" type="text" maxLength={2} placeholder="MM" value={tempDate.month}  onChange={onChangeInputs}/>- 
            </label>
            <label htmlFor="day">
                <input className="w-9" name="day" id="day" type="text" maxLength={2} placeholder="DD" value={tempDate.day} onChange={onChangeInputs} />
            </label>
        </div>
        <div className="pt-2 pl-4 text-left">
            <label htmlFor="time">Time (24hr): 
                <input className="w-12 " name="time" id="time" type="text" maxLength={5} placeholder="Time" value={tempDate.time} onChange={onChangeTime} onBlur={onBlurTime} />
            </label>
        </div>
        </div>
    )
}

export default DateInput
