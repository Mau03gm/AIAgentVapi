// importar estilos
import '../styles/globals.css';
import Nav from '@/components/Nav';

// Definir los metadatos
export const metadata = {
    title: "Titulo",
    description: 'Descripcion'
}

// Cambiar el nombre del layout
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Nav/>
          <main className="app">
            {children}
          </main>
      </body>
    </html>
  )
}

export default RootLayout;