import React, { useState, useEffect, useRef } from "react"
import { CircleAlert, CircleX } from "lucide-react"

function Stop_Watch({ font_color, make_close, background, background_second_complement, background_complement }) {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div>
            <div className="p-2 cursor-pointer w-4" onClick={() => make_close(false)}>
                <CircleX color={font_color} />
            </div>
            <div className="flex flex-col items-center justify-center pl-12">
                <div className="p-4" style={{ color: font_color, fontSize: 30 }}>{formatTime()}</div>
                <div className="flex flex-row gap-6 py-3">
                    <button onClick={start} className="border rounded-lg px-6 py-2" style={{ color: font_color, borderColor: background_second_complement }}>Start</button>
                    <button onClick={stop} className="border rounded-lg px-6 py-2" style={{ color: font_color, borderColor: background_second_complement }}>Stop</button>
                    <button onClick={reset} className="border rounded-lg px-6 py-2" style={{ color: font_color, borderColor: background_second_complement }}>Reset</button>
                </div>
            </div>
        </div>

    );
}
export default Stop_Watch