import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, User, Target, Brain, AlertCircle } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-96 min-h-screen bg-slate-50/50 border-r">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Detalles del Prospecto</h2>
          {/* <p className="text-sm text-slate-500 mt-1">Detalles del prospecto y contexto</p> */}
        </div>

        <Card className="border-none shadow-none bg-white/50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Prospecto
            </h3>
            <div className="space-y-3 ml-7">
              <p className="text-slate-900 font-medium">Ingeniero Carlos Mendoza</p>
              <div className="flex items-center text-slate-600 text-sm">
                <Briefcase className="mr-2 h-4 w-4 text-slate-400" />
                Director General - Distribución de alimentos orgánicos
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                Veracruz, México
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-white/50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Perfil
            </h3>
            <p className="text-sm text-slate-600 ml-7">
              Hombre de 42 años, profesional, dirige una microempresa formalizada con 8 empleados que distribuye frutas y verduras a restaurantes y supermercados locales.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-white/50">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              Problema
            </h3>
            <p className="text-sm text-slate-600 ml-7">
              Necesita crédito para comprar vehículos de reparto para mejorar su logística. Tiene experiencia tratando con bancos, pero busca soluciones financieras flexibles y personalizadas.
            </p>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}