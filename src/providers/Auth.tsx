'use client'

import { getMeClient } from '@/api/getMeClient'
import { Login, login as loginAPI } from '@/api/login'
import { Logout, logout as logoutAPI } from '@/api/logout'
import { User } from '@/lib/payloadTypes'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type Status = undefined | 'loggedOut' | 'loggedIn'

type AuthContext = {
  login: Login
  logout: Logout
  user?: User | null
  status: Status
}

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>()
  const [status, setStatus] = useState<Status>()

  const login = useCallback<Login>(async (args) => {
    try {
      const user = await loginAPI(args)

      if (user) {
        setUser(user)
        setStatus('loggedIn')
      }

      return user
    } catch (e) {
      throw e
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      await logoutAPI()
      setUser(null)
      setStatus('loggedOut')
    } catch (e) {
      throw e
    }
  }, [])

  useEffect(() => {
    const getMe = async () => {
      try {
        const user = await getMeClient()

        if (user) {
          setUser(user)
          setStatus('loggedIn')
        }
      } catch (error) {
        setUser(null)
      }
    }

    getMe()
  }, [])

  return (
    <Context.Provider value={{ user, status, login, logout }}>
      {children}
    </Context.Provider>
  )
}

type UseAuth = () => AuthContext

export const useAuth: UseAuth = () => useContext(Context)
