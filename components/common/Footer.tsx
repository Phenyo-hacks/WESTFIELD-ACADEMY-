export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 text-center text-gray-600 border-t border-gray-200">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Westfield Academy. All rights reserved.</p>
        <p className="text-sm mt-1">Powered by EduTech Solutions</p>
      </div>
    </footer>
  )
}
