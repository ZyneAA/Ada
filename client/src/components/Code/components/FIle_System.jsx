import React, { useState } from "react"

const File_System = ({ data, selected_path }) => {

	const [open_folders, set_open_folders] = useState({});

  	const toggle_folder = (folder) => {

    	set_open_folders((prev_open_folders) => ({
			...prev_open_folders,
			[folder]: !prev_open_folders[folder],
    	}))

  	}

	const send_path = (current_path) => {

		selected_path(current_path)
		
	}

  	const render_tree = (node, path = '') => {

		return Object.keys(node).map((key) => {
			const value = node[key]
			const current_path = path ? `${path}/${key}` : key;

			if (typeof value === "string") {
				// This is a file
				return (
					<div key={current_path} className="pl-2">
						<span className="text-white cursor-pointer" onClick={() => send_path([current_path, key])}>{key}</span>
					</div>
				)
			} 
			else {
				// This is a folder
				return (
					<div key={current_path} className="pl-2">
						<div
							className="cursor-pointer text-white"
							onClick={() => toggle_folder(current_path)}
						>
							{"> "}{key}
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
