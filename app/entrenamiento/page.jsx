'use client';
import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import RoleplayInterface from "@/components/RoleplayInterface";
import InstructionsRP from "@/components/InstructionsRP";
import { FloatingCountdownTimer } from "@/components/Timer";

const API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY;
const AIAGENT_ID = process.env.NEXT_PUBLIC_VAPI_SALESTRANING_ID;

const vapi = new Vapi(API_KEY);
const Entrenamiento = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(null);
  const [showTimer, setShowTimer] = useState(false);

  const agentType = "Entrenamiento de Ventas";
  const descriptionAgent = "Practica tus habilidades de venta en frío con Carlos Mendoza, un simulador de cliente potencial para Caja Yanga";
  const features = [
    { name: "Escenarios Realistas", description: "Simulación de diferentes tipos de prospectos y objeciones comunes" },
    { name: "Retroalimentación Inmediata", description: "Aprende de cada interacción con análisis detallado" },
    { name: "Práctica Segura", description: "Ambiente controlado para mejorar técnicas de venta" },
  ];
  const srcSaraJessica = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const agentName = "Ing. Carlos Mendoza";
  const agentRole = "Cliente Potencial Simulado @ Entrenamiento Caja Yanga";
  const services = ["Venta en Frío", "Tono Frío", "Manejo de Objeciones"];

  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
      setShowTimer(true);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
      setShowTimer(false);
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

  const handleStop = () => {
    vapi.stop();
    setShowTimer(false);
  };

  const onTimerEnd = () => {
    handleStop();
  };

  return (
    <div className="flex">
      <InstructionsRP />
      <div className="flex-1">
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
        {showTimer && <FloatingCountdownTimer initialTime={45} onEnd={onTimerEnd} />}
      </div>
    </div>
  );
};

export default Entrenamiento;