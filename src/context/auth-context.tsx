
import { createContext, useState, useEffect, ReactNode } from "react"
import { User, AuthResponse, AuthContextType } from "@/types/auth"

interface AuthProviderProps {
  children: ReactNode
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [googleLoading, setGoogleLoading] = useState(false)

  
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

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in real app this would come from API
      const userData: User = {
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

  const loginWithGoogle = async (): Promise<AuthResponse> => {
    setGoogleLoading(true)
    try {
      // Simulate Google OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock Google user data - in real app this would come from Google OAuth
      const googleUserData: User = {
        id: "google_" + Date.now(),
        email: "user@gmail.com",
        name: "Google User",
        userType: "student",
        avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
        createdAt: new Date().toISOString(),
        provider: "google",
      }

      setUser(googleUserData)
      localStorage.setItem("educonnect_user", JSON.stringify(googleUserData))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Google sign-in failed" }
    } finally {
      setGoogleLoading(false)
    }
  }

  const register = async (userData: Partial<User>): Promise<AuthResponse> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || "",
        name: userData.name || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        password: userData.password || "",
        userType: userData.userType || "student",
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

  const logout = (): void => {
    setUser(null)
    localStorage.removeItem("educonnect_user")
  }

  const value: AuthContextType = {
    user,
    loading,
    googleLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}