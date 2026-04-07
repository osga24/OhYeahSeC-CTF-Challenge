// src/app/challenge/9/page.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import LetterGlitch from "../../components/LetterGlitch";

// 第九關挑戰頁面
export default function Challenge9Page() {
  const level = 9;
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 登入平台網址
  const loginURL =
    "oysc-challenge-panel-challenge-yeyj-ri22qrktr-osga24s-projects.vercel.app";

  // 題目內容 - 結合之前的世界觀
  const challenge = {
    title: "守護者的第一道防線",
    description:
      "系統監測顯示，入侵者已經突破了多個安全節點。作為數位守護者，你必須迅速找出隱藏的系統弱點。每一個被遺忘的數位足跡都可能成為拯救「新紀元」的關鍵。\n\n監測數據警示：若不能在限定時間內修復所有節點，防火牆將徹底崩潰，數百萬用戶的數據將暴露於黑暗網路中。",
    flag: "OYSC{R0B0TS_TXT_1S_N0T_4_S3CUR1TY_M3CHANISM}",
  };

  // 自動聚焦輸入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 處理FLAG提交
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 驗證答案 - 去除頭尾空格後進行比較
    const trimmedInput = userInput.trim();
    const correctFlag = challenge.flag.trim();

    if (trimmedInput === correctFlag) {
      setFeedback("數據節點修復成功！系統防禦再次穩定...");

      // 延遲跳轉到下一關
      setTimeout(() => {
        router.push("/challenge/10_HmfPsygKVlEX");
      }, 2000);
    } else {
      setFeedback("節點修復失敗！系統防禦仍然脆弱...");
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  };
  return (
    <div className="relative h-screen bg-black overflow-hidden text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 opacity-20">
        <LetterGlitch
          glitchColors={["#1a3b4c", "#4dc3a1", "#3498db"]}
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
          <div className="mb-8 text-lg font-mono whitespace-pre-line">
            {challenge.description}
          </div>

          {/* 網頁登入鏈結 */}
          <div className="mb-12 flex flex-col items-center">
            <div className="mb-4 text-xl text-yellow-300 font-semibold">
              滲透目標:
            </div>
            <a
              href={loginURL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>進入數位戰場</span>
            </a>
          </div>

          {/* 輸入區域 */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col items-center space-y-4">
              <label htmlFor="flag" className="text-xl font-semibold">
                輸入節點修復金鑰:
              </label>
              <input
                ref={inputRef}
                type="text"
                id="flag"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full max-w-lg px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="輸入修復金鑰..."
                spellCheck="false"
                autoComplete="off"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                啟動修復
              </button>

              {/* 反饋信息 */}
              {feedback && (
                <div
                  className={`mt-4 px-6 py-3 rounded-lg ${feedback.includes("成功") ? "bg-green-700/50" : "bg-red-700/50"}`}
                >
                  {feedback}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/50">
        © 2025 OhYeahSeC Challenge - 數位守護者
      </div>
    </div>
  );
}
