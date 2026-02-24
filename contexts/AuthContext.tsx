"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  username: string
  role: "Admin" | "Teacher" | "Student" | "Parent"
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call to /api/auth/login
      const mockUsers = [
        {
          id: 1,
          username: "admin",
          password: "admin123",
          role: "Admin" as const,
          name: "Dr. Patricia Moore",
          email: "admin@westfield.edu",
        },
        {
          id: 2,
          username: "teacher",
          password: "teacher123",
          role: "Teacher" as const,
          name: "Prof. Robert Johnson",
          email: "rjohnson@westfield.edu",
        },
        {
          id: 3,
          username: "student",
          password: "student123",
          role: "Student" as const,
          name: "Sarah Mitchell",
          email: "smitchell@student.westfield.edu",
        },
        {
          id: 4,
          username: "parent",
          password: "parent123",
          role: "Parent" as const,
          name: "Mr. Robert Mitchell",
          email: "rmitchell@parent.westfield.edu",
        },
      ]

      const foundUser = mockUsers.find((u) => u.username === username && u.password === password)

      if (foundUser) {
        const mockToken = `jwt_token_${foundUser.id}_${Date.now()}`
        const userData = {
          id: foundUser.id,
          username: foundUser.username,
          role: foundUser.role,
          name: foundUser.name,
          email: foundUser.email,
        }

        setToken(mockToken)
        setUser(userData)

        localStorage.setItem("auth_token", mockToken)
        localStorage.setItem("auth_user", JSON.stringify(userData))

        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export type { User }
