"use client";

import { Switch } from 'antd';
import { useContext } from "react";
import { HiMoon, HiSun } from "react-icons/hi"; // Import icons from Heroicons

import { ToggleThemeContext } from "@/context/toggle-theme-provider";


export default function ThemeToggler() {
	const toggleTheme = useContext(ToggleThemeContext);

	return (

		<label className="inline-flex items-center cursor-pointer ml-4">
			<Switch
				checkedChildren={<HiMoon style={{ height: "20px"}} />}
				unCheckedChildren={<HiSun style={{ height: "25px"}}/>}
				onChange={toggleTheme}
				defaultChecked
			/>
			{/* <input type="checkbox" onChange={toggleTheme} className="sr-only peer" />
			<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}
		</label>

	);
}
