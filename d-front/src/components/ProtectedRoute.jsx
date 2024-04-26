import { useEffect } from "react"
import {  useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
        }
    },[navigate])
  return (
    <>{children}</>
  )
}

export default ProtectedRoute
