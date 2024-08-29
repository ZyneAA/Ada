import React, { useState, useEffect } from 'react';
import axios from "axios";
// import ChevronDownIcon from '../icons/chevron-down.svg';

const Most_Used_Langs = () => {
    const [exe, set_exe] = useState([]);

    useEffect(() => {
        const get_exe = async () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const hours = today.getHours();
            const minutes = today.getMinutes();
            const seconds = today.getSeconds();

            const date1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const date0 = `${year}-${month}-1`;

            try {
                const response = await axios.get(
                    `http://localhost:8000/bridge/v1/labyrinth/get_exe_data_by_date_range?date_0=${date0}&date_1=${date1}`
                );
                const log = response.data;

                // Count the occurrences of each language
                const languageCount = log.reduce((acc, item) => {
                    acc[item.language] = (acc[item.language] || 0) + 1;
                    return acc;
                }, {});

                // Convert to array and sort by count
                const sortedLanguages = Object.entries(languageCount)
                    .map(([language, count]) => ({ language, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3); // Get the top 3 languages

                set_exe(sortedLanguages);
            } catch (err) {
                console.log(err);
            }
        };

        get_exe();
    }, []);

    const get_today = async() => {

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        const date1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const date0 = `${year}-${month}-${day}`;

        try {
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_exe_data_by_date_range?date_0=${date0}&date_1=${date1}`
            );
            const log = response.data;

            // Count the occurrences of each language
            const languageCount = log.reduce((acc, item) => {
                acc[item.language] = (acc[item.language] || 0) + 1;
                return acc;
            }, {});

            // Convert to array and sort by count
            const sortedLanguages = Object.entries(languageCount)
                .map(([language, count]) => ({ language, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3); // Get the top 3 languages

            set_exe(sortedLanguages);
        } catch (err) {
            console.log(err);
        }

    }

    const get_this_month = async() => {

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        const date1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const date0 = `${year}-${month}-1`;

        try {
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_exe_data_by_date_range?date_0=${date0}&date_1=${date1}`
            );
            const log = response.data;

            // Count the occurrences of each language
            const languageCount = log.reduce((acc, item) => {
                acc[item.language] = (acc[item.language] || 0) + 1;
                return acc;
            }, {});

            // Convert to array and sort by count
            const sortedLanguages = Object.entries(languageCount)
                .map(([language, count]) => ({ language, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 3); // Get the top 3 languages

            set_exe(sortedLanguages);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-loose text-white">Top Languages</h2>
                <div className="flex flex-row gap-x-2.5 py-3 px-4 rounded-lg">
                    {/* <ChevronDownIcon /> */}
                    <button onClick={get_today} className="text-sm text-white border rounded-lg px-4">Today</button>
                    <button onClick={get_this_month} className="text-sm text-white border rounded-lg px-4">This Month</button>
                </div>
            </div>
            <hr className="border-gray-700" />
            <div className="flex gap-x-7">
                {/* <img width="176" src="/img/chart.svg" alt="Order Chart" /> */}
                <div className="flex flex-col gap-y-4">
                    {exe.map((order, index) => (
                        <div key={index} className="flex gap-x-2 items-start">
                            <div className="p-2 bg-gray-800 rounded-lg">
                                {/* Placeholder for language icons */}
                                <div className="w-6 h-6 bg-gray-600 rounded-full" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">{order.language}</div>
                                <div className="text-xs text-gray-500">{order.count} Execution</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Most_Used_Langs
