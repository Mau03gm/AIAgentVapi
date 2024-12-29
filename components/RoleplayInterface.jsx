'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Headphones, MessageSquare, Clock } from 'lucide-react'

const RoleplayInterface = ({nameAgent, srcAgent, descriptionAgent, roleAgent,
                            services, features, agenType, connected, handleStart,
                             handleStop, agentIsTalking
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Main Container */}
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white p-2">
                  <img
                    src="https://www.cajayanga.coop/wp-content/uploads/2022/07/logo_red.png"
                    alt="Caja Yanga Logo"
                    className="h-8 w-8"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white">{agenType}</h1>
              </div>
              
              <div className="text-lg text-blue-50">
                {descriptionAgent}
              </div>
            </div>
          </div>
        </Card>

        {/* Feature Cards Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border-b-4 ${index % 2 === 0 ? 'border-blue-500' : 'border-cyan-500'} p-4`}
            >
              <div className={`absolute right-2 top-2 ${index % 2 === 0 ? 'text-blue-500' : 'text-cyan-500'}`}>
                {index % 2 === 0 ? <Headphones className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
              </div>
              <h3 className="mb-1 text-base font-semibold">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Agent Card */}
        <Card className="overflow-hidden">
          <div className="p-6 md:p-8 bg-white">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-blue-100">
                  <img
                    src={srcAgent}
                    alt="Imagen de la agente"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{nameAgent}</h2>
                <p className="text-muted-foreground">
                  {roleAgent}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {services.map((service, index) => (
                    <Badge 
                        key={index} 
                        variant="secondary" 
                        className={`bg-blue-50 text-blue-700 ${index % 2 === 1 ? 'bg-cyan-50 text-cyan-700' : ''}`}
                    >
                        {service}
                    </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Call Button */}
          <div className="p-4">
            {connected ? (
              <Button 
                className="rounded-2xl w-full bg-red-600 text-white hover:bg-red-800"
                size="lg"
                onClick={() => handleStop()}
              >
                <Phone className="mr-2 h-5 w-5" />
                Finalizar Llamada de Prueba
              </Button>
            ) : (
              <Button 
                className="rounded-2xl w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:bg-blue-50"
                size="lg"
                onClick={() => handleStart()}
              >
                <Phone className="mr-2 h-5 w-5" />
                Iniciar Llamada de Prueba
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default RoleplayInterface
