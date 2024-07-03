import { createContext, useContext } from "react"


export const AuthContex=createContext()
export const useAuth=()=>{
    return useContext(AuthContex)
}
export function AuthContextProvider({children}) {
  return (
    <AuthContex.Provider value={1}>
     {children}
    </AuthContex.Provider>
    
  )
}

