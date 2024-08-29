import React, { useState, useEffect } from 'react';
import axios from "axios";

const Lang_Report = () => {
	const [orders, setOrders] = useState([]);
	const [visibleCount, setVisibleCount] = useState(15); // Start by showing 15 items

	useEffect(() => {
		const getExeData = async () => {
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
    
                    setOrders(sortedLanguages);
                    console.log(sortedLanguages)
            } catch (err) {
                console.log(err);
            }
		};

		getExeData();
	}, []);

	const loadMore = () => {
		setVisibleCount(prevCount => prevCount + 15);
	};

	const load_year = async () => {

		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const day = today.getDate();
		const hours = today.getHours();
		const minutes = today.getMinutes();
		const seconds = today.getSeconds();

		const date1 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		const date0 = `${year - 1}-1-1`;

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

                setOrders(sortedLanguages);
                console.log(sortedLanguages)
        } catch (err) {
            console.log(err);
        }

	}

	const load_month = async () => {

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

                setOrders(sortedLanguages);
                console.log(sortedLanguages)
        } catch (err) {
            console.log(err);
        }

	}

	const load_day = async () => {

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

                setOrders(sortedLanguages);
                console.log(sortedLanguages)
        } catch (err) {
            console.log(err);
        }

	}

	return (
		<div className="p-6 bg-gray-900 rounded-lg">
			<div className="flex justify-between items-center pb-4">
				<h2 className="text-xl font-semibold leading-loose text-white">Executions Report</h2>
				<div className='flex flex-row gap-3'>
					<div className="flex justify-center mt-4">
						<button
							onClick={load_year}
							className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
						>
							Load Yearly
						</button>
					</div>
					<div className="flex justify-center mt-4">
						<button
							onClick={load_month}
							className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
						>
							Load Monthly
						</button>
					</div>
					<div className="flex justify-center mt-4">
						<button
							onClick={load_day}
							className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
						>
							Load Daily
						</button>
					</div>
				</div>
			</div>
			<table className="w-full">
				<thead>
					<tr className="text-sm font-semibold text-white">
						<td className="py-4 border-b border-gray-700">Language</td>
						<td className="py-4 border-b border-gray-700">Times</td>
					</tr>
				</thead>
				<tbody>
					{orders.slice(0, visibleCount).map((order, index) => (
						<tr key={index} className="text-sm text-gray-500">
							<td className="py-4">{order.language}</td>
							<td className="py-4 tabular-nums text-left">{order.count}</td>
						</tr>
					))}
				</tbody>
			</table>
			{visibleCount < orders.length && (
				<div className="flex justify-center mt-4">
					<button
						onClick={loadMore}
						className="bg-slate-600 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
					>
						Load More
					</button>
				</div>
			)}
		</div>
	);
};

export default Lang_Report;