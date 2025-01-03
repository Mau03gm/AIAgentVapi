import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Calendar } from 'lucide-react'
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function Report() {
  const [progress, setProgress] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  const progressRef = useRef(null);
  const checklistRef = useRef(null);
  const calendarRef = useRef(null);
  const summaryRef = useRef(null);

  // Fecha simulada para la cita
  const date = new Date(2024, 3, 15);

  const scrollToRef = (ref) => {
    if (ref.current) {
      setTimeout(() => {
        const yOffset = -50; // Offset para dar un poco de espacio arriba
        const element = ref.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 200); // Aumentamos el delay para asegurar que el elemento está renderizado
    }
  };

  useEffect(() => {
    // Animación progresiva de la barra
    const duration = 1500;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    // Scroll inicial al progreso
    setTimeout(() => {
      scrollToRef(progressRef);
    }, 100);

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        currentProgress = 100;
        
        // Mostrar checklist después de que la barra se llene
        setTimeout(() => {
          setShowChecklist(true);
          setTimeout(() => scrollToRef(checklistRef), 300);
        }, 500);

        // Mostrar calendario
        setTimeout(() => {
          setShowCalendar(true);
          setTimeout(() => scrollToRef(calendarRef), 300);
        }, 6500);

        // Mostrar resumen
        setTimeout(() => {
          setShowSummary(true);
          setTimeout(() => scrollToRef(summaryRef), 300);
        }, 7500);
      }
      setProgress(Math.min(Math.round(currentProgress), 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const checklistItems = [
    "Sara Jessica se presentó al cliente.",
    "Sara Jessica explicó el proceso de la encuesta.",
    "Sara Jessica informó al cliente sobre el aviso de privacidad.",
    "Sara Jessica registró el nombre del cliente.",
    "Sara Jessica detectó el problema del cliente.",
    "Sara Jessica canalizó correctamente al cliente",
    "Sara Jessica recopiló el número de teléfono del cliente.",
    "Sara Jessica programó una cita con un experto."
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.8,
        duration: 0.5
      }
    }
  }

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
  }

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
  }

  return (
    <div className="w-full max-w-md min-h-screen p-4 md:p-2 lg:p-2 bg-gradient-to-b from-gray-50 to-gray-100 shadow-md rounded-lg">
      <div className="space-y-6 bg-white rounded-lg p-4">
        <div>
          <h2 className="text-2xl p-2 font-semibold text-slate-900">Reporte de Llamada</h2>
        </div>

        <Card className="border-b-4 border-green-500 p-4 bg-white/70" ref={progressRef}>
          <CardContent className="p-2">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Progreso de la Llamada</h3>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Porcentaje completado: {progress}%</p>
            </div>
          </CardContent>
        </Card>

        {showChecklist && (
          <Card className="border-b-4 border-green-500 p-4 bg-white/70" ref={checklistRef}>
            <CardContent className="p-2">
              <h3 className="text-lg font-medium mb-4">Checklist de la Llamada</h3>
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
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        )}

        {showCalendar && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            ref={calendarRef}
          >
            <Card className="border-b-4 border-green-500 p-4 bg-white/70">
              <CardContent className="p-2">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Cita Agendada
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Llamada agendada para el {date.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  defaultMonth={date}
                  className="rounded-md border"
                  modifiers={{
                    booked: date
                  }}
                  modifiersStyles={{
                    booked: {
                      backgroundColor: '#22c55e',
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

        {showSummary && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            ref={summaryRef}
          >
            <Card className="border-b-4 border-green-500 p-4 bg-white/70">
              <CardContent className="p-2">
                <h3 className="text-lg font-medium mb-2">Resumen de la Llamada</h3>
                <p className="text-sm text-gray-600">
                  El cliente fue atendido satisfactoriamente. Se identificó su necesidad de soporte técnico 
                  relacionada con problemas de acceso a la plataforma. Se programó una cita con el equipo 
                  técnico para el día siguiente. El cliente mostró satisfacción con la atención recibida.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
