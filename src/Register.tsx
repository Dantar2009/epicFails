import { useContext } from "react"
import MainContext from "./MainContext"
import RegOrSigninCard from "./components/RegOrSigninCard"

function Register(){
    const {
        loginText,
        setLoginText,
        loginError,
        passwordText,
        setPasswordText,
        passwordError,
        register,
        toSignin,
        toHome
    } = useContext(MainContext)
    
    return(
        <RegOrSigninCard>
            <p style={{
                fontSize: 32,
                color: "#e7e8ea",
                textAlign: "center",
                margin: "10px 0 30px 0",
                fontWeight: 500
            }}>
                Регистрация
            </p>
            
            <input 
                type="text" 
                placeholder="Логин" 
                value={loginText} 
                onChange={(e: any) => setLoginText(e.target.value)}
                style={{
                    padding: "14px 18px",
                    background: "#2a323a",
                    color: "#e7e8ea",
                    border: "1px solid #3a3a3c",
                    borderRadius: 12,
                    fontSize: 16,
                    outline: "none",
                    marginBottom: 5,
                    boxSizing: "border-box"
                }}
            />
            {loginError && <p style={{ 
                color: "#dc3545", 
                margin: "5px 0 20px 5px",  
                fontSize: 15 
            }}>{loginError}</p>}
            
            <input 
                type="password" 
                placeholder="Пароль" 
                value={passwordText} 
                onChange={(e: any) => setPasswordText(e.target.value)}
                style={{
                    padding: "14px 18px",
                    background: "#2a323a",
                    color: "#e7e8ea",
                    border: "1px solid #3a3a3c",
                    borderRadius: 12,
                    fontSize: 16,
                    outline: "none",
                    marginBottom: 5,
                    boxSizing: "border-box",
                    marginTop:20
                }}
            />
            {passwordError && <p style={{ 
                color: "#dc3545", 
                margin: "5px 0 20px 5px", 
                fontSize: 15 
            }}>{passwordError}</p>}
            
            <button 
                onClick={() => register(loginText, passwordText)}
                style={{
                    padding: "14px",
                    background: "#7351c4",
                    color: "#f0f7ff",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: "pointer",
                    marginBottom: 20,
                    marginTop:30,
                    transition: "0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#5f34c2"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#7351c4"}
            >
                Зарегистрироваться
            </button>
            
            <p 
                onClick={toSignin}
                style={{
                    color: "#7351c4",
                    textAlign: "center",
                    cursor: "pointer",
                    margin: 0
                }}
            >
                Уже есть аккаунт? Войти
            </p>
            <p 
                onClick={toHome}
                style={{
                    color: "#7351c4",
                    textAlign: "center",
                    padding:10,
                    fontSize: 16,
                    cursor: "pointer",
                    margin: 0
                }}
            >
                На главную
            </p>
        </RegOrSigninCard>
    )
}

export default Register