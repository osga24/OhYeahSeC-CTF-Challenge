// src/app/challenge/10/page.tsx
"use client";

import React, {
	useState,
	useEffect,
	useRef,
	FormEvent,
	useCallback
} from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '../../components/LetterGlitch';

export default function Challenge10Page() {
	const level = 10;
	const [userInput, setUserInput] = useState('');
	const [feedback, setFeedback] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const challenge = {
		title: "溯源",
		description: "恭喜到達最終關卡。最後的挑戰不需要搜尋特定人物，而是要找出這個 CTF 平台本身的開源專案位置。請輸入本專案的 GitHub Repo 網址。",
		flag: "https://github.com/osga24/OhYeahSeC-CTF-Challenge"
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isSubmitting) return;

		const trimmedInput = userInput.trim();
		if (!trimmedInput) {
			setFeedback('請輸入 GitHub 網址');
			return;
		}

		if (!trimmedInput.includes('github.com')) {
			setFeedback('這似乎不是 GitHub 網址');
			return;
		}

		setIsSubmitting(true);
		setFeedback('');

		const normalize = (url: string) => url.toLowerCase().replace(/\/+$/, '');
		const inputUrl = normalize(trimmedInput);
		const correctUrl = normalize(challenge.flag);

		if (inputUrl === correctUrl) {
			setFeedback('驗證成功！正在前往完成頁面...');
			setTimeout(() => {
				router.push('/end_HUAterpbJppw');
			}, 2000);
		} else {
			setFeedback('網址不正確，請再試一次。');
			setTimeout(() => {
				setFeedback('');
				setIsSubmitting(false);
			}, 3000);
		}
	}, [userInput, isSubmitting, challenge.flag, router]);

	return (
		<div className="relative h-screen bg-black overflow-hidden text-white">
			<div className="absolute inset-0 opacity-20">
				<LetterGlitch
					glitchColors={['#1a3b4c', '#4dc3a1', '#3498db']}
					glitchSpeed={50}
					centerVignette={false}
					outerVignette={true}
					smooth={true}
				/>
			</div>

			<div dangerouslySetInnerHTML={{ __html: '' }} />

			<div className="relative z-10 h-full flex flex-col items-center overflow-y-auto">
				<div className="w-full py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-center mb-8">
					<h1 className="text-3xl font-bold">
						第{level}關：{challenge.title}
					</h1>
				</div>

				<div className="w-full max-w-4xl px-6 py-8 bg-gradient-to-b from-gray-900/70 to-black/70 rounded-lg shadow-2xl mx-auto mb-8">
					<div className="mb-8 text-lg font-mono text-center">
						{challenge.description}
					</div>

					<div className="mb-10 flex justify-center">
						<div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-800 border-2 border-purple-500/30">
							<svg viewBox="0 0 24 24" className="w-16 h-16 text-white" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="mt-8">
						<div className="flex flex-col items-center space-y-4">
							<label htmlFor="flag" className="text-xl font-semibold">
								輸入 GitHub Repository 網址:
							</label>
							<div className="relative w-full max-w-lg">
								<input
									ref={inputRef}
									type="text"
									id="flag"
									value={userInput}
									onChange={(e) => setUserInput(e.target.value)}
									className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
									placeholder="https://github.com/..."
									spellCheck="false"
									autoComplete="off"
									disabled={isSubmitting}
								/>
							</div>
							<button
								type="submit"
								disabled={isSubmitting}
								className={`px-8 py-3 text-lg font-bold rounded-lg transition-all duration-300 transform
                  ${isSubmitting
										? 'bg-gray-600 text-gray-400 cursor-not-allowed'
										: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 hover:scale-105'
									}`}
							>
								{isSubmitting ? '驗證中...' : '提交'}
							</button>

							{feedback && (
								<div className={`mt-4 px-6 py-3 rounded-lg ${feedback.includes('驗證成功') ? 'bg-green-700/50' : 'bg-red-700/50'}`}>
									{feedback}
								</div>
							)}
						</div>
					</form>
				</div>
			</div>

			<div className="absolute bottom-4 left-0 right-0 text-center text-white/50">
				© 2025 OhYeahSeC Challenge
			</div>
		</div>
	);
}
