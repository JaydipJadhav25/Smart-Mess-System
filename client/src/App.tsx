import { Button } from "@/components/ui/button"
import { ModeToggle } from "./components/mode-toggle"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
       <div className="p-40">
        <h1 className="bg-gradient-to-r from-background via-yellow-200 to-orange-600">smart mess</h1>
       </div>
      <ModeToggle/>
    </div>
  )
}

export default App