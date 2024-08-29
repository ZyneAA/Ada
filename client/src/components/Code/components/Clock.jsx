import React, {useState, useEffect} from 'react';
import { CircleAlert, CircleX } from "lucide-react"

function DigitalClock({background_color, font_color, background_complement, background_second_complement, make_close}){

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function formatTime(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }
    
    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className="">
            <div className="p-2 cursor-pointer w-4" onClick={() => make_close(false)}>
                <CircleX color={font_color} />
            </div>
            <div className="flex justify-center items-center pl-14" style={{backgroundColor: background_color, color: font_color}}>
                <span>{formatTime()}</span>
            </div>
        </div>
    );
}
export default DigitalClock;