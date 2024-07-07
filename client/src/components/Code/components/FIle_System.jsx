import React, { useState } from "react"
import { FaRegFile } from "react-icons/fa"
import { FaRegFolder } from "react-icons/fa"
import { MdArrowForwardIos } from "react-icons/md"

const File_System = ({ data, selected_path, selected_folder }) => {

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

  	const render_tree = (node, path = "") => {

		return Object.keys(node).map((key) => {
			const value = node[key]
			const current_path = path ? `${path}/${key}` : key;

			if (typeof value === "string") {
				// This is a file
				return (
					<div key={current_path} className="flex flex-row items-center pl-6 cursor-pointer text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-500">
						<FaRegFile color="gray" size="18" />
						<p onClick={() => send_path([current_path, key])}>{key}</p>
					</div>
				)
			} 
			else {
				// This is a folder
				return (
					<div key={current_path} className="pl-2">
						<div
							className="flex flex-row items-center cursor-pointer text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-500"
							onClick={() => toggle_folder(current_path)}
						>
							<MdArrowForwardIos color="gray" size="15" />
							<FaRegFolder color="gray" size="18"/>
							<p className="pl-1">{key}</p>
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
