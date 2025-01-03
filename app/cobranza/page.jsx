'use client';
import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import Image from "next/image";
import RoleplayInterface from "@/components/RoleplayInterface";
import ReportDebt from "@/components/ReportDebt";

const API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY;
const AIAGENT_ID = process.env.NEXT_PUBLIC_VAPI_DEBT_ID;

const vapi = new Vapi(API_KEY);
const Home = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(null);


  const agentType = "Departamento de Cobranza";
  const descriptionAgent = "Experimenta una llamada de cobranza con Allyson, asistente virtual de Caja Yanga";
  const features = [
    { name: "Gestión de Deudas", description: "Asistente para la gestión y seguimiento de deudas" },
    { name: "Información de Pagos", description: "Información clara sobre pagos y fechas límite" },
    { name: "Soluciones de Pago", description: "Ofrece soluciones de pago flexibles y personalizadas" },
  ];
  const srcSaraJessica = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const agentName = "Allyson";
  const agentRole = "Asesora de Cobranza y Deudas @ Caja Yanga";
  const services = ["Gestión de Deudas", "Información de Pagos", "Soluciones de Pago"];


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
      setTimeout(() => {
        if (connected) { // Verifica si sigue conectado antes de colgar
          handleStop();
        }
      }, 180000); // 3 minutos en milisegundos
    };

  const handleStop = () => vapi.stop();


  return (
    <div className="flex gap-4 h-screen overflow-y-auto relative">
      <ReportDebt />
      <RoleplayInterface 
        nameAgent={agentName} 
        descriptionAgent={descriptionAgent} 
        srcAgent={srcSaraJessica} 
        roleAgent={agentRole}
        services={services} 
        features={features} 
        agenType={agentType} 
        connected={connected} 
        handleStart={handleStart} 
        handleStop={handleStop}
        agentIsTalking={assistantIsSpeaking}
      />
    </div>
  );
};

export default Home;