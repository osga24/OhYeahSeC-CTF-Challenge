// src/app/challenge/7/page.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LetterGlitch from '../../components/LetterGlitch';

export default function Challenge7Page() {
	const level = 7;
	const [userInput, setUserInput] = useState('');
	const [feedback, setFeedback] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const challenge = {
		title: "視覺密碼學",
		description: "你截獲了一組神秘的圖片，據說只有將它們正確疊加才能找到隱藏的訊息。黑客留下了一個名為 layer1.png 和 layer2.png 的圖層，試著找出它們的秘密。",
		flag: "OhYeahSeC{D0m_Ev3n7_M4n1puLa710n_1s_Fun}"
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	// 添加 FormEvent 类型注解
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedInput = userInput.trim();
		const correctFlag = challenge.flag.trim();

		if (trimmedInput === correctFlag) {
			setFeedback('恭喜！FLAG正確。正在前往下一關...');

			setTimeout(() => {
				router.push('/challenge/8_WCwfbPFLfcdd');
			}, 2000);
		} else {
			setFeedback('FLAG不正確，請再試一次。');
			setTimeout(() => {
				setFeedback('');
			}, 3000);
		}
	};

	return (
		<div className="relative h-screen bg-black overflow-hidden text-white">
			{/* 背景效果 */}
			<div className="absolute inset-0 opacity-20">
				<LetterGlitch
					glitchColors={['#1a3b4c', '#4dc3a1', '#3498db']}
					glitchSpeed={50}
					centerVignette={false}
					outerVignette={true}
					smooth={true}
				/>
			</div>

			{/* 內容區域 */}
			<div className="relative z-10 h-full flex flex-col items-center overflow-y-auto">
				{/* 標題區域 */}
				<div className="w-full py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-center mb-8">
					<h1 className="text-3xl font-bold">
						第{level}關：{challenge.title}
					</h1>
				</div>

				{/* 內容區域 */}
				<div className="w-full max-w-4xl px-6 py-8 bg-gradient-to-b from-gray-900/70 to-black/70 rounded-lg shadow-2xl mx-auto mb-8">
					{/* 題目描述 */}
					<div className="mb-8 text-lg font-mono">
						{challenge.description}
					</div>

					{/* 圖片區域 */}
					<div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* 第一張圖 */}
						<div className="bg-black p-2 border border-purple-500/30 rounded-lg">
							<h3 className="text-center mb-2 text-white font-mono">Layer 1</h3>
							<div className="relative h-[250px] w-full">
								<Image
									src="/images/layer1.png"
									alt="第一層圖片"
									fill
									style={{ objectFit: 'contain' }}
									className="rounded-lg"
								/>
							</div>
							<div className="text-center mt-2">
								<a
									href="/images/layer1.png"
									download="layer1.png"
									className="text-blue-400 hover:text-blue-300 text-sm underline"
								>
									下載 layer1.png
								</a>
							</div>
						</div>

						{/* 第二張圖 */}
						<div className="bg-black p-2 border border-purple-500/30 rounded-lg">
							<h3 className="text-center mb-2 text-white font-mono">Layer 2</h3>
							<div className="relative h-[250px] w-full">
								<Image
									src="/images/layer2.png"
									alt="第二層圖片"
									fill
									style={{ objectFit: 'contain' }}
									className="rounded-lg"
								/>
							</div>
							<div className="text-center mt-2">
								<a
									href="/images/layer2.png"
									download="layer2.png"
									className="text-blue-400 hover:text-blue-300 text-sm underline"
								>
									下載 layer2.png
								</a>
							</div>
						</div>
					</div>

					{/* 輸入區域 */}
					<form onSubmit={handleSubmit} className="mt-8">
						<div className="flex flex-col items-center space-y-4">
							<label htmlFor="flag" className="text-xl font-semibold">
								輸入FLAG:
							</label>
							<input
								ref={inputRef}
								type="text"
								id="flag"
								value={userInput}
								onChange={(e) => setUserInput(e.target.value)}
								className="w-full max-w-lg px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
								placeholder="輸入你的答案..."
								spellCheck="false"
								autoComplete="off"
							/>
							<button
								type="submit"
								className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
							>
								提交
							</button>

							{/* 反饋信息 */}
							{feedback && (
								<div className={`mt-4 px-6 py-3 rounded-lg ${feedback.includes('恭喜') ? 'bg-green-700/50' : 'bg-red-700/50'}`}>
									{feedback}
								</div>
							)}
						</div>
					</form>
				</div>
			</div>

			{/* 底部信息 */}
			<div className="absolute bottom-4 left-0 right-0 text-center text-white/50">
				© 2025 OhYeahSeC Challenge
			</div>
		</div>
	);
}
