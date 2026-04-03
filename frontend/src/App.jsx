
import { TooltipProvider } from "./components/ui/tooltip"
import AppRoutes from "./routes/AppRoutes"
import { Toaster } from "sonner"

function App() {


  return (
    <>
   
   <TooltipProvider>
    <Toaster position="bottom-right" richColors />
      <AppRoutes/>
   </TooltipProvider>
      
    
    
    </>
  )
}

export default App
