import React, { useState } from "react"
import axios from "axios"
import { FaRegFile } from "react-icons/fa"
import { FcOpenedFolder } from "react-icons/fc"
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../../misc/Context_Menu"
import { motion } from "framer-motion"
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
	CsharpOriginal,
	ElixirOriginal,
	HaskellOriginal,
	KotlinOriginal,
	LuaOriginal,
	MatlabOriginal,
	PerlPlain,
	PerlOriginal,
	ZigOriginal,
	PowershellOriginal,
} from "devicons-react"
import { FcFolder } from "react-icons/fc"
import "../../../css/misc.css"

const File_System = ({ data, selected_path, selected_folder, changes_occour, font_color, icon_color, background_complement }) => {

	const [open_folders, set_open_folders] = useState({});
	const [open, set_open] = useState(false)

	const [sf, set_sf] = useState()

	const [rn, set_rn] = useState(false)
	const [rn_file, set_rn_file] = useState(null)
	const [rename_change, set_rename_chnage] = useState(null)

	const [selectedFile, setSelectedFile] = useState([])

	const icons = {
		cs: <CsharpOriginal color={icon_color} size="18" />,
		ts: <TypescriptOriginal color={icon_color} size="18" />,
		js: <JavascriptOriginal color={icon_color} size="18" />,
		py: <PythonOriginal color={icon_color} size="18" />,
		html: <Html5Original color={icon_color} size="18" />,
		css: <Css3Original color={icon_color} size="18" />,
		java: <JavaOriginal color={icon_color} size="18" />,
		cpp: <CplusplusOriginal color={icon_color} size="18" />,
		c: <COriginal color={icon_color} size="18" />,
		ruby: <RubyOriginal color={icon_color} size="18" />,
		bash: <BashOriginal color={icon_color} size="18" />,
		php: <PhpOriginal color={icon_color} size="18" />,
		go: <GoOriginal color={icon_color} size="18" />,
		swift: <SwiftOriginal color={icon_color} size="18" />,
		rs: <RustOriginal color={icon_color} size="18" />,
		ex: <ElixirOriginal color={icon_color} size="18" />,
		exs: <ElixirOriginal color={icon_color} size="18" />,
		hs: <HaskellOriginal color={icon_color} size="18" />,
		lhs: <HaskellOriginal color={icon_color} size="18" />,
		kt: <KotlinOriginal color={icon_color} size="18" />,
		lua: <LuaOriginal color={icon_color} size="18" />,
		m: <MatlabOriginal color={icon_color} size="18" />,
		pl: <PerlOriginal color={icon_color} size="18" />,
		zig: <ZigOriginal color={icon_color} size="18" />,
		ps1: <PowershellOriginal color={icon_color} size="18" />,
		// Add more mappings as needed
	}

	const toggle_folder = (folder) => {

		selected_folder(folder)
		setSelectedFile(folder)
		set_sf(folder)
		set_open(!open)

		set_open_folders((prev_open_folders) => ({
			...prev_open_folders,
			[folder]: !prev_open_folders[folder],
		}))

	}

	const send_path = (current_path) => {

		setSelectedFile(current_path)
		selected_path(current_path)

	}

	const rename = (path) => {

		set_rn(!rn)
		set_rn_file(path)

	}

	const delete_file = async (current_path) => {

		try {
			const response = await axios.get(
				`http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${current_path}`,
				{ withCredentials: true }
			)

			const sha = response.data[0].sha

			const response_1 = await axios.delete(
				`http://localhost:8000/bridge/v1/labyrinth/delete_file?file_path=${current_path}&sha=${sha}`,
				{ withCredentials: true }
			)
			changes_occour({ cause: `${current_path} deleted` })
			console.log(response_1.data)
		}
		catch (err) {
			console.log(err)
		}

	}

	const keydown = async (e, current_path, key) => {

		if (e.key === "Enter") {

			console.log(current_path)

			let new_path = current_path.replace(new RegExp(`/${key}$`), '')

			if (new_path !== "") {
				new_path = new_path + '/'
			}

			if (!current_path.includes('/')) {
				new_path = ""
			}
			console.log(new_path)

			try {
				const response = await axios.get(
					`http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${current_path}`,
					{ withCredentials: true }
				)

				const sha = response.data[0].sha

				const response_1 = await axios.delete(
					`http://localhost:8000/bridge/v1/labyrinth/delete_file?file_path=${current_path}&sha=${sha}`,
					{ withCredentials: true }
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

				changes_occour({ cause: `${key} in ${new_path} renamed to ${rename_change}` })
				console.log(response_2.data)
			}
			catch (err) {
				console.log(err)
			}

		}

	}

	const render_tree = (node, path = "") => {

		return Object.keys(node).map((key) => {
			const value = node[key]
			const current_path = path ? `${path}/${key}` : key;

			if (typeof value === "string") {

				const is_selected = current_path == selectedFile[0]
				const file_style = {
					fontSize: "15px",
					backgroundColor: is_selected ? background_complement : "transparent",
					color: is_selected ? icon_color : font_color,
				}
				const ext = key.split('.').pop()
				const icon = icons[ext] || <FaRegFile color={icon_color} size="18" />

				// This is a file
				return (
					<div key={current_path} className="pl-2">
						<ContextMenu>
							<ContextMenuTrigger>
								<div className="flex flex-row gap-1 px-4 cursor-pointer items-center" style={file_style} >
									{icon}
									{
										rn === false ?
											<p onClick={() => send_path([current_path, key])}>{key}</p> :
											current_path === rn_file ?
												<input placeholder={key}
													className=" w-32 overflow-hidden outline-none"
													style={{ color: font_color, backgroundColor: background_complement }}
													onChange={(e) => set_rename_chnage(e.target.value)}
													onKeyDown={(e) => keydown(e, current_path, key)}
												>
												</input> :
												<p style={file_style} onClick={() => send_path([current_path, key])}>{key}</p>

									}
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent style={{ backgroundColor: icon_color, color: background_complement, borderColor: icon_color }} className="rounded-md">
								<ContextMenuItem onClick={() => send_path([current_path, key, 0])}>Open</ContextMenuItem>
								<ContextMenuItem onClick={() => rename(current_path)}>Rename</ContextMenuItem>
								<ContextMenuItem onClick={() => delete_file(current_path)}>Delete</ContextMenuItem>
								<ContextMenuItem onClick={() => send_path([current_path, key, 2])} className="rounded-none" style={{ borderColor: background_complement }}>Show path</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					</div>
				)
			}
			else {
				// This is a folder
				const is_selected = current_path == selectedFile
				const file_style = {
					backgroundColor: is_selected ? background_complement : "transparent",
					color: is_selected ? icon_color : font_color,
				}

				return (
					<div key={current_path} className="pl-2" style={file_style}>
						<div
							className="flex flex-row items-center cursor-pointer text-transparent bg-clip-text" style={{ backgroundColor: font_color }}
							onClick={() => toggle_folder(current_path)}
						>
							{open_folders[current_path] ? 
								<div className="flex flex-row items-center">
									<MdKeyboardArrowDown color={icon_color} size="15" />
									<FcOpenedFolder size="18" />
								</div> :
								<div className="flex flex-row items-center">
									<MdKeyboardArrowRight color={icon_color} size="15" />
									<FcFolder size="18" />
								</div>}
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
