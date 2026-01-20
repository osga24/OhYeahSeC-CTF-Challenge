// src/app/challenge/07/page.tsx
"use client";

import React, { useState, useCallback } from 'react';
import LetterGlitch from '../../components/LetterGlitch';

export default function Challenge07Page() {
	const level = 7;
	const [position, setPosition] = useState({ top: '50%', left: '50%' });
	const [hoverCount, setHoverCount] = useState(0);

	const challenge = {
		title: "動態目標",
		description: "這個控制單元似乎拒絕被存取。請嘗試手動覆寫它的指令。",
		flag: "OhYeahSeC{D0m_Ev3n7_M4n1puLa710n_1s_Fun}"
	};

	// 移動按鈕邏輯
	const moveButton = useCallback(() => {
		// 隨機移動範圍 (10% - 90%)
		const newTop = Math.floor(Math.random() * 80) + 10;
		const newLeft = Math.floor(Math.random() * 80) + 10;

		setPosition({
			top: `${newTop}%`,
			left: `${newLeft}%`
		});

		setHoverCount(prev => prev + 1);
	}, []);

	// 點擊處理 - 直接 Alert
	const handleClick = () => {
		alert(`恭喜！FLAG 是：\n\n${challenge.flag}`);
	};

	// 根據滑鼠移動次數改變按鈕文字
	const getButtonText = () => {
		if (hoverCount === 0) return "點擊存取";
		if (hoverCount < 5) return "你點不到";
		if (hoverCount < 10) return "太慢了！";
		return "試試別的方法？";
	};

	return (
		<div className="relative h-screen bg-black overflow-hidden text-white select-none">
			{/* 背景效果 */}
			<div className="absolute inset-0 opacity-20 pointer-events-none">
				<LetterGlitch
					glitchColors={['#1a3b4c', '#4dc3a1', '#3498db']}
					glitchSpeed={50}
					centerVignette={false}
					outerVignette={true}
					smooth={true}
				/>
			</div>

			{/* 隱藏提示：Tab 鍵是好朋友 */}
			<div dangerouslySetInnerHTML={{ __html: '' }} />

			{/* 標題與說明 */}
			<div className="relative z-10 w-full py-4 text-center pointer-events-none">
				<div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-4 mb-8">
					<h1 className="text-3xl font-bold">第{level}關：{challenge.title}</h1>
				</div>
				<p className="text-lg font-mono text-gray-300 max-w-2xl mx-auto px-4">
					{challenge.description}
				</p>
			</div>

			{/* 逃跑的按鈕 */}
			<button
				onClick={handleClick}
				onMouseEnter={moveButton}
				style={{
					top: position.top,
					left: position.left,
					position: 'absolute',
					transform: 'translate(-50%, -50%)',
					transition: 'top 0.15s ease-out, left 0.15s ease-out' // 快速移動
				}}
				className="z-20 px-8 py-3 bg-red-600 hover:bg-red-500 border border-red-400 
                   text-white font-bold font-mono rounded shadow-[0_0_10px_rgba(220,38,38,0.8)]
                   whitespace-nowrap cursor-pointer focus:outline-none focus:ring-4 focus:ring-white focus:bg-green-600 focus:border-green-400"
			>
				{getButtonText()}
			</button>

			<div className="absolute bottom-4 left-0 right-0 text-center text-white/50 pointer-events-none">
				© 2025 OhYeahSeC Challenge
			</div>
		</div>
	);
}
