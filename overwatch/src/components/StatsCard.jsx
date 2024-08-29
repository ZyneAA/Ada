import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	JavascriptOriginal,
	PythonOriginal,
	JavaOriginal,
	TypescriptOriginal,
	Css3Original,
	Html5Original,
	COriginal,
	CplusplusOriginal,
	RubyOriginal,
	RustOriginal,
	PhpOriginal,
	GoOriginal,
	SwiftOriginal,
	BashOriginal,
} from "devicons-react"

import { BiCodeBlock, BiMale } from "react-icons/bi";

const StatsCard = ({change}) => {

	const [total_exe, set_total_exe] = useState(0)
	const [total_visit, set_total_visit] = useState(0)

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
			const date0 = `${year}-${month}-${day} 00:00:00`;

			try {
				const response = await axios.get(
					`http://localhost:8000/bridge/v1/labyrinth/get_exe_data_by_date_range?date_0=${date0}&date_1=${date1}`
				);
				console.log(response.data.length)
				set_total_exe(response.data.length)
			} catch (err) {
				console.log(err);
			}

			try {
				const response = await axios.get(
					`http://localhost:8000/bridge/v1/labyrinth/get_visitations_by_last_visit_range?date_0=${date0}&date_1=${date1}`
				);
				console.log(date0, date1)
				set_total_visit(response.data.length)
			} catch (err) {
				console.log(err);
			}
		}

		getExeData()

	}, []);

	const stats = [
		{
			title: "Today's Executions",
			percentage: '',
			value: total_exe,
			icon: BiCodeBlock,
		},
		{
			title: "Today's Visitations",
			percentage: '',
			value: total_visit,
			icon: BiMale,
		},
	];

	return (
		<div className="flex gap-6">
			{stats.map((stat, index) => (
				<div key={index} className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3 h-36">
					<div className="flex items-center gap-x-3">
						<div className="p-2 bg-gray-800 rounded-lg flex flex-row justify-center items-center gap-6">
							<stat.icon className="w-6 h-6 fill-current text-white" />
							<div className="text-3xl font-semibold text-white pr-6">{stat.value}</div>
						</div>
						<span
							className={`text-xs font-medium ${stat.status === 'up' ? 'text-accent-green' : 'text-accent-red'
								}`}
						>
							<div className='text-white'>
								{stat.percentage}

							</div>
						</span>
					</div>
					<div className="text-sm tracking-wide text-gray-500">{stat.title}</div>
				</div>
			))}
			<div className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3">
				<div className="p-2 rounded-lg flex flex-col justify-center items-center gap-6">
					<div onClick={() => change(1)} className="text-l p-2 px-1 cursor-pointer font-semibold text-white underline">Client report</div>
					{/* <div onClick={() => change(2)} className="text-l p-2 px-20 cursor-pointer font-semibold text-white underline">See runtimes</div> */}
					<div onClick={() => change(3)} className="text-l p-2 px-1 cursor-pointer font-semibold text-white underline">Total executions of each language</div>
				</div>
			</div>
		</div>
	);
};

export default StatsCard;
