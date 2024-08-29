import React, { useState, useEffect } from 'react';
import axios from "axios";

const OrderReport = () => {
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
				const newOrders = log.map(item => ({
					name: item.user_id,
					language: item.language,
					usage: item.date,
					status: item.version,
				}));

				setOrders(prevOrders => [...prevOrders, ...newOrders]);
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
			const newOrders = log.map(item => ({
				name: item.user_id,
				language: item.language,
				usage: item.date,
				status: item.version,
			}));
			console.log(response.data)
			setOrders(newOrders);
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
			const newOrders = log.map(item => ({
				name: item.user_id,
				language: item.language,
				usage: item.date,
				status: item.version,
			}));
			console.log(response.data)
			setOrders(newOrders);
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
			const newOrders = log.map(item => ({
				name: item.user_id,
				language: item.language,
				usage: item.date,
				status: item.version,
			}));

			console.log(newOrders)
			setOrders(newOrders);
		} catch (err) {
			console.log(err);
		}

	}

	return (
		<div className="p-6 bg-gray-900 rounded-lg">
			<div className="flex justify-between items-center pb-4">
				<h2 className="text-xl font-semibold leading-loose text-white">Client Report</h2>
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
						<td className="py-4 border-b border-gray-700">Client Id</td>
						<td className="py-4 border-b border-gray-700">Language</td>
						<td className="py-4 border-b border-gray-700 text-right">Execution Date</td>
						<td className="py-4 border-b border-gray-700 text-center">Language Version</td>
					</tr>
				</thead>
				<tbody>
					{orders.slice(0, visibleCount).map((order, index) => (
						<tr key={index} className="text-sm text-gray-500">
							<td className="py-4">
								<div className="flex gap-4 items-center">
									<a href={`user/${order.name}`}><span className="cursor-pointer underline">{order.name}</span></a>
								</div>
							</td>
							<td className="py-4">{order.language}</td>
							<td className="py-4 tabular-nums text-right">{order.usage}</td>
							<td className="py-4 flex justify-center">
								<span
									className={`flex justify-center py-1 w-24 font-medium capitalize rounded-full ${order.status === 'completed'
										? 'bg-accent-green/20 text-accent-green'
										: order.status === 'preparing'
											? 'bg-accent-purple/20 text-accent-purple'
											: 'bg-accent-orange/20 text-accent-green'
										}`}
								>
									{order.status}
								</span>
							</td>
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

export default OrderReport;
