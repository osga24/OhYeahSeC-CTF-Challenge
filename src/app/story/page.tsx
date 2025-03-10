"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '../components/LetterGlitch';

interface StoryPage {
  title: string;
  content: string;
  image?: string;
}

export default function StoryPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedContent, setTypedContent] = useState('');
  const [isTypingContent, setIsTypingContent] = useState(false);

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const contentTypingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const storyPages: StoryPage[] = [
    {
      title: "數位世界的警報",
      content: "在虛擬網域「新紀元」中，一個神秘的系統警報突然在你的介面上彈出。警報顯示核心數據庫遭到入侵，多個安全節點已被攻破，整個虛擬世界的穩定性面臨嚴重威脅。"
    },
    {
      title: "守護者的挑戰",
      content: "作為具備高級權限的數位守護者，系統自動將你傳送到安全測試區域。只有通過一系列資安挑戰，你才能獲得修復受損節點的加密金鑰。"
    },
    {
      title: "數位崩壞的威脅",
      content: "監測數據顯示，若不能在限定時間內修復所有節點，「新紀元」的防火牆將徹底崩潰，數百萬用戶的數據將暴露於黑暗網路中。你是最後的希望。"
    },
    {
      title: "挑戰啟動",
      content: "第一個安全測試已準備就緒。系統將評估你的加密破解、代碼分析和漏洞識別能力。每完成一個挑戰，就能恢復一個安全節點的運作。\n\n虛擬世界的命運掌握在你手中。你準備好接受挑戰了嗎？"
    }
  ];

  const currentStory = storyPages[currentPage];

  useEffect(() => {
    setTypedTitle('');
    setTypedContent('');
    setIsTypingContent(false);
    setShowNextButton(false);

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    if (contentTypingIntervalRef.current) {
      clearInterval(contentTypingIntervalRef.current);
    }

    const title = currentStory.title;
    let titleIndex = 0;

    typingIntervalRef.current = setInterval(() => {
      if (titleIndex < title.length) {
        setTypedTitle(title.substring(0, titleIndex + 1));
        titleIndex++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        setIsTypingContent(true);
      }
    }, 100);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      if (contentTypingIntervalRef.current) {
        clearInterval(contentTypingIntervalRef.current);
        contentTypingIntervalRef.current = null;
      }
    };
  }, [currentPage, currentStory.title]);

  useEffect(() => {
    if (isTypingContent) {
      const content = currentStory.content;
      let contentIndex = 0;

      contentTypingIntervalRef.current = setInterval(() => {
        if (contentIndex < content.length) {
          setTypedContent(content.substring(0, contentIndex + 1));
          contentIndex++;
        } else {
          if (contentTypingIntervalRef.current) {
            clearInterval(contentTypingIntervalRef.current);
            contentTypingIntervalRef.current = null;
          }
          setTimeout(() => {
            setShowNextButton(true);
          }, 500);
        }
      }, 50);

      return () => {
        if (contentTypingIntervalRef.current) {
          clearInterval(contentTypingIntervalRef.current);
          contentTypingIntervalRef.current = null;
        }
      };
    }
  }, [isTypingContent, currentStory.content]);

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.push('/challenge/1_QTMpnQaJpslW');
    }
  };

  const handleSkip = () => {
    router.push('/challenge/1_QTMpnQaJpslW');
  };

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

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-900/20 to-black/70"
        style={{
          backgroundImage: currentStory.image
            ? `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(45,0,75,0.3), rgba(0,0,0,0.8)), url(${currentStory.image})`
            : 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(45,0,75,0.2), rgba(0,0,0,0.9))',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="text-center p-6 max-w-4xl">
          <h1 className="mb-12 text-white text-5xl font-bold">
            {typedTitle}
            {typedTitle.length < currentStory.title.length &&
              <span className="inline-block w-3 h-10 bg-white animate-pulse ml-1"></span>
            }
          </h1>

          <div className="mb-16 bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <pre className="text-xl whitespace-pre-wrap font-sans text-left">
              {typedContent}
              {isTypingContent && typedContent.length < currentStory.content.length &&
                <span className="inline-block w-2 h-5 bg-white animate-pulse ml-1"></span>
              }
            </pre>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <button
              className="px-6 py-2 bg-gray-800/70 text-gray-300 text-lg rounded-lg hover:bg-gray-700 transition-all duration-300"
              onClick={handleSkip}
            >
              跳過故事
            </button>

            <div
              className={`transition-all duration-500 ${showNextButton ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'}`}
            >
              <button
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xl font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
                onClick={handleNext}
              >
                {currentPage < storyPages.length - 1 ? '下一頁' : '開始挑戰'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {storyPages.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-purple-500' : 'bg-gray-600'}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
