import React, { useState } from "react"
import axios from "axios"
import { FaRegFile } from "react-icons/fa"
import { FaRegFolder } from "react-icons/fa"
import { MdArrowForwardIos } from "react-icons/md"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../../misc/Context_Menu"
import { color } from "framer-motion"
import { FolderOpen } from "lucide-react"
import "../../../css/misc.css"

const File_System = ({ data, selected_path, selected_folder, changes_occour, font_color, icon_color, background_complement }) => {

	const [open_folders, set_open_folders] = useState({});
	const [open, set_open] = useState(false)

	const [sf, set_sf] = useState()

	const [rn, set_rn] = useState(false)
	const [rn_file, set_rn_file] = useState(null)
	const [rename_change, set_rename_chnage] = useState(null)

	const toggle_folder = (folder) => {

		selected_folder(folder)
		set_sf(folder)
		set_open(!open)

		set_open_folders((prev_open_folders) => ({
			...prev_open_folders,
			[folder]: !prev_open_folders[folder],
		}))

	}

	const send_path = (current_path) => {

		selected_path(current_path)

	}

	const rename = (path) => {

		set_rn(!rn)
		set_rn_file(path)

	}

	const delete_file = async(current_path) => {

		try{
			const response = await axios.get(
				`http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${current_path}`,
				{ withCredentials: true }
			)

			const sha = response.data[0].sha

			const response_1 = await axios.delete(
				`http://localhost:8000/bridge/v1/labyrinth/delete_file?file_path=${current_path}&sha=${sha}`,
				{withCredentials: true}
			)
			changes_occour({cause: `${current_path} deleted`})
			console.log(response_1.data)
		}
		catch(err) {
			console.log(err)
		}

	}

	const keydown = async(e, current_path, key) => {

		if (e.key === "Enter") {

			console.log(current_path)

			let new_path = current_path.replace(new RegExp(`/${key}$`), '')
			
			if(new_path !== "") {
				new_path = new_path + '/'
			}

			if(!current_path.includes('/')) {
				new_path = ""
			}
			console.log(new_path)
			
			try{
				const response = await axios.get(
					`http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${current_path}`,
					{ withCredentials: true }
				)
			
				const sha = response.data[0].sha
	
				const response_1 = await axios.delete(
					`http://localhost:8000/bridge/v1/labyrinth/delete_file?file_path=${current_path}&sha=${sha}`,
					{withCredentials: true}
				)

				const response_2 = await axios.post(
					`http://localhost:8000/bridge/v1/labyrinth/rename_file`,
					{
						folder: new_path,
						filename: rename_change,
						content: response.data[1]
					},
					{ withCredentials: true }
				)

				changes_occour({cause: `${key} in ${new_path} renamed to ${rename_change}`})
				console.log(response_2.data)
			}
			catch(err) {
				console.log(err)
			}

		}

	}

	const render_tree = (node, path = "") => {

		return Object.keys(node).map((key) => {
			const value = node[key]
			const current_path = path ? `${path}/${key}` : key;

			if (typeof value === "string") {
				// This is a file
				return (
					<div key={current_path} className="flex flex-row items-center pl-6 cursor-pointer text-transparent bg-clip-text" style={{ backgroundColor: font_color }}>
						<ContextMenu>
							<ContextMenuTrigger>
								<div className="flex flex-row justify-center items-center">
									<FaRegFile color={icon_color} size="18" />
									{
										rn === false ?
										<p onClick={() => send_path([current_path, key])}>{key}</p> :
										current_path === rn_file ?
										<input placeholder={key} 
											className=" w-32 overflow-hidden outline-none" 
											style={{color: font_color, backgroundColor: background_complement }}
											onChange={(e) => set_rename_chnage(e.target.value)}
											onKeyDown={(e) => keydown(e, current_path, key)}
											>
											</input>:
										<p onClick={() => send_path([current_path, key])}>{key}</p> 

									}
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent style={{backgroundColor: icon_color, color: background_complement, borderColor: icon_color}}>
								<ContextMenuItem onClick={() => send_path([current_path, key, 0])}>Open</ContextMenuItem>
								<ContextMenuItem className="border-b rounded-none" style={{borderColor: background_complement}} onClick={() => send_path([current_path, key, 1])}>Run this file</ContextMenuItem>
								<ContextMenuItem onClick={() => rename(current_path)}>Rename</ContextMenuItem>
								<ContextMenuItem onClick={() => delete_file(current_path)}>Delete</ContextMenuItem>
								<ContextMenuItem>Move to another path</ContextMenuItem>							
								<ContextMenuItem onClick={() => send_path([current_path, key, 2])} className="border-b rounded-none" style={{borderColor: background_complement}}>Show path</ContextMenuItem>
								<ContextMenuItem>Download</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					</div>
				)
			}
			else {
				// This is a folder
				return (
					<div key={current_path} className="pl-2">
						<div
							className="flex flex-row items-center cursor-pointer text-transparent bg-clip-text" style={{ backgroundColor: font_color }}
							onClick={() => toggle_folder(current_path)}
						>
							<MdArrowForwardIos color={icon_color} size="15" />
							<FaRegFolder color={icon_color} size="18" />
							<p className="pl-1 overflow-hidden">{key}</p>
							{/*   */}
						</div>
						{open_folders[current_path] && (
							<div className="pl-2">{render_tree(value, current_path)}</div>
						)}
					</div>
				)
			}
		})
	}

	return <div>{render_tree(data)}</div>

}

export default File_System
