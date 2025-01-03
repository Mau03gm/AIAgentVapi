import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Calendar, Clock, AlertCircle, User, HandshakeIcon } from 'lucide-react'
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function ReportDebt() {
  const [showStage, setShowStage] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showNextActions, setShowNextActions] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  
  const stageRef = useRef(null);
  const checklistRef = useRef(null);
  const durationRef = useRef(null);
  const summaryRef = useRef(null);
  const nextActionsRef = useRef(null);

  // Fecha simulada para seguimiento
  const followUpDate = new Date(2024, 3, 20);

  const stages = [
    "Primer contacto exitoso",
    "Cliente interesado",
    "Negociación en curso",
    "Compromiso de pago",
    "Pago parcial",
    "Recuperación total",
    "Caso escalado"
  ];

  const checklistItems = [
    "Allyson informó al cliente sobre el saldo pendiente en su cuenta.",
    "Allyson detalló los intereses acumulados sobre la deuda.",
    "Allyson escuchó atentamente la situación presentada por el cliente.",
    "Allyson propuso realizar el pago mínimo como primera alternativa.",
    "Allyson advirtió que, en caso de no realizar el pago mínimo, el cliente podría ser reportado al buró de crédito.",
    "Allyson enfatizó la importancia de efectuar el pago mínimo."
  ];

  const scrollToRef = (ref) => {
    if (ref.current) {
      setTimeout(() => {
        const yOffset = -50;
        const element = ref.current;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 200);
    }
  };

  useEffect(() => {
    // Mostrar etapa y animar progreso
    setTimeout(() => {
      setShowStage(true);
      scrollToRef(stageRef);
      setCurrentStage(0);

      // Mostrar duración primero
      setTimeout(() => {
        setShowDuration(true);
        setCallDuration(8); // 8 minutos de duración simulada
        scrollToRef(durationRef);
      }, 2000);

      // Mostrar checklist después de la duración
      setTimeout(() => {
        setShowChecklist(true);
        scrollToRef(checklistRef);
      }, 4000);

      // Mostrar resumen
      setTimeout(() => {
        setShowSummary(true);
        scrollToRef(summaryRef);
      }, 6000);

      // Mostrar próximas acciones
      setTimeout(() => {
        setShowNextActions(true);
        scrollToRef(nextActionsRef);
      }, 8000);

    }, 500);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.8
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full max-w-md min-h-screen p-4 md:p-2 lg:p-2 bg-gradient-to-b from-gray-50 to-gray-100 shadow-md rounded-lg">
      <div className="space-y-6 bg-white rounded-lg p-4">
        <div>
          <h2 className="text-2xl p-2 font-semibold text-slate-900">Reporte de Cobranza</h2>
        </div>

        {showStage && (
          <Card className="border-b-4 border-blue-500 p-4 bg-white/70" ref={stageRef}>
            <CardContent className="p-2">
              <h3 className="text-lg font-medium mb-4">Etapa de Cobranza</h3>
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 ${index === 0 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    <span className="text-sm">{stage}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {showDuration && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            ref={durationRef}
          >
            <Card className="border-b-4 border-blue-500 p-4 bg-white/70">
              <CardContent className="p-2">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Duración de la Llamada
                </h3>
                <p className="text-3xl font-bold text-blue-600 ml-7">
                  {callDuration} minutos
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {showChecklist && (
          <Card className="border-b-4 border-blue-500 p-4 bg-white/70" ref={checklistRef}>
            <CardContent className="p-2">
              <h3 className="text-lg font-medium mb-4">Acciones Realizadas</h3>
              <motion.ul 
                className="space-y-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {checklistItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={listItem}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        )}

        {showSummary && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            ref={summaryRef}
          >
            <Card className="border-b-4 border-blue-500 p-4 bg-white/70">
              <CardContent className="p-2">
                <h3 className="text-lg font-medium mb-4">Resumen del Cliente</h3>
                <div className="space-y-4 ml-2">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-1">Situación del Cliente</h4>
                    <p className="text-sm text-gray-600">
                      Cliente con dificultades financieras temporales debido a gastos médicos inesperados.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-1">Objeciones</h4>
                    <p className="text-sm text-gray-600">
                      Solicita extensión del plazo debido a la situación actual.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-1">Acuerdo Alcanzado</h4>
                    <p className="text-sm text-gray-600">
                      Se acordó un plan de pagos parciales durante los próximos 3 meses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {showNextActions && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            ref={nextActionsRef}
          >
            <Card className="border-b-4 border-blue-500 p-4 bg-white/70">
              <CardContent className="p-2">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Próximas Acciones
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Llamada de seguimiento programada para el {followUpDate.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <CalendarComponent
                  mode="single"
                  selected={followUpDate}
                  defaultMonth={followUpDate}
                  className="rounded-md border"
                  modifiers={{
                    booked: followUpDate
                  }}
                  modifiersStyles={{
                    booked: {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
