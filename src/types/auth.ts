// types/auth.ts
export interface User {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  password?: string
  confirmPassword?: string
  userType: "student" | "teacher" | "admin" | "university" | "homeowner" | string
  avatar?: string | null
  createdAt: string
  provider?: string
}

export interface AuthResponse {
  success: boolean
  error?: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  googleLoading: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  register: (userData: Partial<User>) => Promise<AuthResponse>
  loginWithGoogle: () => Promise<AuthResponse>
  logout: () => void
  isAuthenticated: boolean
}