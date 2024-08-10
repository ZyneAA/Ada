import React, { useState } from "react"
import axios from "axios"
import { FaRegFile } from "react-icons/fa"
import { FaRegFolder } from "react-icons/fa"
import { MdArrowForwardIos } from "react-icons/md"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../../misc/Context_Menu"

const File_System = ({ data, selected_path, selected_folder, changes_occour, font_color, icon_color, background_complement }) => {

	const [open_folders, set_open_folders] = useState({});
	const [open, set_open] = useState(false)

	const toggle_folder = (folder) => {

		selected_folder(folder)
		set_open(!open)

		set_open_folders((prev_open_folders) => ({
			...prev_open_folders,
			[folder]: !prev_open_folders[folder],
		}))

	}

	const send_path = (current_path) => {

		selected_path(current_path)

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
									<p onClick={() => send_path([current_path, key])}>{key}</p>
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent style={{backgroundColor: icon_color, color: background_complement, borderColor: icon_color}}>
								<ContextMenuItem onClick={() => send_path([current_path, key, 0])}>Open</ContextMenuItem>
								<ContextMenuItem className="border-b rounded-none" style={{borderColor: background_complement}} onClick={() => send_path([current_path, key, 1])}>Run the file</ContextMenuItem>
								<ContextMenuItem>Rename</ContextMenuItem>
								<ContextMenuItem onClick={() => delete_file(current_path)}>Delete</ContextMenuItem>
								<ContextMenuItem>Move to another path</ContextMenuItem>
								<ContextMenuItem>Show path</ContextMenuItem>
								<ContextMenuItem className="border-b rounded-none" style={{borderColor: background_complement}}>Copy path</ContextMenuItem>
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
