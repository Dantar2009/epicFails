import { useEffect, useState } from "react"
import MainContext from "./MainContext"
import { useNavigate } from "react-router-dom"

type User = {
    id: number,
    name: string,
    pass: string,
    pick: number
}
type Mess = {
    id: number,
    sender: string,
    text: string,
    rating: number
}

function Prov({ children }: { children: any }) {

    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL

    const [user, setUser] = useState<User | null>(() => {
        const data = localStorage.getItem("user")
        return data ? JSON.parse(data) : null
    })
    
    const [messages, setMessages] = useState<Mess | []>([])
    const [loginText, setLoginText] = useState<string>('')
    const [passwordText, setPasswordText] = useState<string>('')
    const [loginError, setLoginError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [messageText, setMessageText] = useState<string>('')
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        return 768 > window.innerWidth
    })
    
    const getMessages = async () => {
        fetch(`${API_URL}/messages/getMessages`)
            .then(response => response.json())
            .then(data => setMessages(data.otvet.sort((a: Mess, b: Mess) => b.rating - a.rating)))
            .catch(err => console.error("Ошибка загрузки сообщений:", err))
    }
    
    const register = async (name: string, pass: string) => {
        try {
            if (name.trim().length < 4) {
                setLoginError("Логин слишком короткий")
                return
            }
            if (pass.trim().length < 8) {
                setPasswordError("Пароль слишком короткий")
                return
            }
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pass })
            })
            const data = await response.json()
            if (data.otvet === "shortName") {
                setLoginError("Логин слишком короткий")
                return
            }
            if (data.otvet === "shortPass") {
                setPasswordError("Пароль слишком короткий")
                return
            }
            if (data.otvet === "userRegistered") {
                setLoginError("Такой пользователь уже зарегистрирован")
                return
            }
            if (data.otvet === "OK") {
                setUser(data.user)
                setLoginError('')
                setPasswordError('')
                setLoginText('')
                setPasswordText('')
                toHome()
            }
        } catch (err) {
            console.error("Ошибка регистрации:", err)
        }
    }
    
    const signIn = async (name: string, pass: string) => {
        try {
            const response = await fetch(`${API_URL}/users/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pass })
            })
            const data = await response.json()
            if (data.otvet === "notFound") {
                setLoginError("Пользователь не найден")
                return
            }
            if (data.otvet === "wrongPass") {
                setPasswordError("Неверный пароль")
                return
            }
            if (data.otvet === "OK") {
                setUser(data.user)
                setLoginError('')
                setPasswordError('')
                setLoginText('')
                setPasswordText('')
                toHome()
            }
        } catch (err) {
            console.error("Ошибка входа:", err)
        }
    }
    
    const signOut = () => {
        setUser(null)
        setLoginError('')
        setPasswordError('')
        setLoginText('')
        setPasswordText('')
        setMessageText('')
        localStorage.removeItem("user")
    }
    
    const toRegister = () => {
        setLoginError('')
        setPasswordError('')
        setLoginText('')
        setPasswordText('')
        navigate('/register')
    }
    
    const toSignin = () => {
        setLoginError('')
        setPasswordError('')
        setLoginText('')
        setPasswordText('')
        navigate('/signin')
    }
    
    const toHome = () => {
        setLoginError('')
        setPasswordError('')
        setLoginText('')
        setPasswordText('')
        navigate('/')
    }
    
    const sendMessage = async (name: string, pass: string, text: string) => {
        try {
            const response = await fetch(`${API_URL}/messages/setMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pass, text })
            })
            const data = await response.json()
            
            if (data.otvet === "regPlease") {
                toRegister()
                return
            }
            if (data.otvet === "noText") {
                return
            }
            if (data.otvet === "OK") {
                setMessages(data.messages.sort((a: Mess, b: Mess) => b.rating - a.rating))
                setMessageText('')
            }
        } catch (err) {
            console.error("Ошибка отправки:", err)
        }
    }
    
    const deleteMessage = async (name: string, pass: string, index: number) => {
        try {
            const response = await fetch(`${API_URL}/messages/deleteMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pass, index })
            })
            const data = await response.json()
            if (data.otvet === "OK") {
                setMessages(data.messages.sort((a: Mess, b: Mess) => b.rating - a.rating))
            }
        } catch (err) {
            console.error("Ошибка удаления:", err)
        }
    }
    
    const voteMessage = async (name: string, pass: string, messageId: number) => {
        try {
            const response = await fetch(`${API_URL}/messages/voteMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, pass, vote: messageId })
            })
            const data = await response.json()
            
            if (data.otvet === "regPlease") {
                toRegister()
                return
            }
            if (data.otvet === "OK" || data.otvet === "cancelled") {
                setMessages(data.messages.sort((a: Mess, b: Mess) => b.rating - a.rating))
                if (data.user) {
                    setUser(data.user)
                }
            }
        } catch (err) {
            console.error("Ошибка голосования:", err)
        }
    }
    
    useEffect(() => {
        getMessages()
        
        const handleResize = () => {
            setIsMobile(768 > window.innerWidth)
        }
        
        window.addEventListener("resize", handleResize)
        
        const interval = setInterval(() => {
            getMessages()
        }, 900000)
        
        return () => {
            clearInterval(interval)
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        }
    }, [user])
    
    return (
        <MainContext.Provider value={{
            user,
            setUser,
            messages,
            setMessages,
            getMessages,
            register,
            signIn,
            signOut,
            sendMessage,
            voteMessage,
            toRegister,
            toSignin,
            toHome,
            loginText,
            setLoginText,
            loginError,
            setLoginError,
            passwordText,
            setPasswordText,
            passwordError,
            setPasswordError,
            messageText,
            setMessageText,
            deleteMessage,
            isMobile,
            setIsMobile
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default Prov