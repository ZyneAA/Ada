import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search_User = () => {

	const [username, set_username] = useState("")
	const [found, set_found] = useState(true)

	const navigate = useNavigate()

	const search = async () => {

		try {
			const user = await axios.get(
				`http://localhost:8000/bridge/v1/labyrinth/check_user_exist_by_username?username=${username}`
			);
			if(user.data.user_id === null) {
				set_found(false)
				return
			}
			else{
				set_found(true)
			}
			navigate(`user/${user.data.user_id}`)
		} catch (error) {
			console.error('Error fetching user data:', error);
		}

	}

	return (
		<div className="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold leading-loose text-white">Search User By Username</h2>
			</div>
			<hr className="border-gray-700" />
			<div className="flex flex-col gap-y-4">
				<input className="text-white bg-gray-600 border-white border rounded-xl p-3 outline-none" onChange={(e) => set_username(e.target.value)}></input>
			</div>
			<button className="py-3.5 rounded-lg w-full border border-primary text-primary text-sm font-semibold text-white" onClick={search}>
				Search
			</button>
			{
				found === false ?
				<p className="text-white justify-center flex">User not found</p> :
				<></>
			}
		</div>
	);
};

export default Search_User;
