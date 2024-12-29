'use client';
import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import Image from "next/image";
import "./talking.css";

const API_KEY= process.env.NEXT_PUBLIC_VAPI_API_KEY;
const AIAGENT_ID= process.env.NEXT_PUBLIC_VAPI_COSTUMERSERVICE_ID;

const vapi= new Vapi(API_KEY);
const Home = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(null);

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (volume) => {
      setVolumeLevel(volume);
    });

    vapi.on("error", (error) => {
      console.error(error);
    });
    setConnecting(false);

  }, []);

  const handleStart = () => {
    setConnecting(true);
    vapi.start(AIAGENT_ID);
  };

  const handleStop = () => vapi.stop();
  

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full bg-blue-900">
      <div className="flex flex-col items-center justify-center mt-10">
        <div className={`bg-white rounded-full p-2 flex items-center justify-center ${assistantIsSpeaking ? 'speaking' : ''}`}>
          <div className="bg-gray-300 rounded-full h-36 w-36 flex items-center justify-center">
            <span className="text-3xl">👤</span> {/* Placeholder for user icon */}
          </div>
        </div>
        <p className="text-center text-lg mt-2">LLamando...</p>
        <p className="text-center text-xl font-bold">Agente de IA</p>
      </div>
      <div className="flex justify-around mb-16 p-6">
        <button onClick={handleStart} className=" p-6 rounded-full flex items-center justify-center">
         <Image src="/accept-call-icon.png" alt="phone" width={55} height={50} 
          className="h-full w-full"/>
        </button>
        <button onClick={handleStop} className="text-white p-6 rounded-full flex items-center justify-center">
          <Image src="/end-call-icon.png" alt="phone" width={50} height={50}
          className="h-full w-full" />
        </button>
      </div>
    </div>
  );
};

export default Home;