"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("educonnect_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in real app this would come from API
      const userData = {
        id: "1",
        email,
        name: email.split("@")[0],
        userType: "student", // This would be determined by the API
        avatar: null,
        createdAt: new Date().toISOString(),
      }

      setUser(userData)
      localStorage.setItem("educonnect_user", JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Invalid credentials" }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: null,
        createdAt: new Date().toISOString(),
      }

      setUser(newUser)
      localStorage.setItem("educonnect_user", JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("educonnect_user")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
