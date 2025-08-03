import { Button } from "@/components/ui/button"
import { ModeToggle } from "./components/mode-toggle"
import SplashScreen from "./components/flashPages/Splash"

function App() {
  return (
     <>
     <SplashScreen/>
     <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
       <div className="p-40">

       </div>
      <ModeToggle/>
    </div>
     </>
  )
}

export default App