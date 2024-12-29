'use client';
import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import Image from "next/image";
import RoleplayInterface from "@/components/RoleplayInterface";

const API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY;
const AIAGENT_ID = process.env.NEXT_PUBLIC_VAPI_COSTUMERSERVICE_ID;


const vapi = new Vapi(API_KEY);
const Home = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(null);


  const agentType = "Soporte al Cliente";
  const descriptionAgent = "Experimenta una llamada de soporte técnico con Sara Jessica, asistente virtual de Caja Yanga";
  const features = [
    { name: "Atención Personalizada", description: "Asistente con atención personalizada como asesor real" },
    { name: "Explicación Clara", description: "Explicaciones simples de productos y servicios" },
    { name: "Resolución Inmediata", description: "Resuelve dudas comunes al instante" },
  ];
  const srcSaraJessica = "https://plus.unsplash.com/premium_photo-1682430836754-4226a6593e6d?q=80&w=2645&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const agentName = "Sara Jessica";
  const agentRole = "Asesora de Soporte Técnico @ Caja Yanga";
  const services = ["Soporte Técnico", "Atención 24/7", "Resolución Inmediata"];


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
      
      // Establecer un temporizador para colgar la llamada después de 3 minutos
      setTimeout(() => {
        if (connected) { // Verifica si sigue conectado antes de colgar
          handleStop();
        }
      }, 180000); // 3 minutos en milisegundos
    };

  const handleStop = () => vapi.stop();


  return (
    <RoleplayInterface nameAgent={agentName} descriptionAgent={descriptionAgent} srcAgent={srcSaraJessica} roleAgent={agentRole}
      services={services} features={features} agenType={agentType} connected={connected} handleStart={handleStart} handleStop={handleStop}
      agentIsTalking={assistantIsSpeaking}
    />
  );
};

export default Home;