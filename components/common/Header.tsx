import { ModeToggle } from "@/components/ui/mode-toggle" // Ensure this import path is correct
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Westfield Academy</h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
            </li>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Settings className="w-5 h-5" />
            </Button>
            {/* The ModeToggle component is placed here */}
            <ModeToggle />
          </ul>
        </nav>
      </div>
    </header>
  )
}
