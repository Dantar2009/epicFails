import { useContext, useState } from "react"
import MainContext from "../MainContext"

export default function MessageInput(){
    const { messageText, setMessageText, sendMessage, user,isMobile } = useContext(MainContext)
    const [isHover, setIsHover] = useState<boolean>(false)
    
    const isEmpty = !messageText.trim()
    
    return(
        <div style={{
            display: "flex",
                flexDirection: "row",
                justifyContent: "center",
        }}>

            <div style={{
                width:isMobile?"95%":"40%",
                display: "flex",
                flexDirection: isMobile?"column": "row",
                justifyContent: "center",
                alignItems: isMobile?"flex-end":"center",
                padding: "50px 0",
                gap: 15,
                boxSizing: "border-box",
            }}>
                <textarea 
                    value={messageText} 
                    onChange={(e: any) => setMessageText(e.target.value)} 
                    placeholder="Напишите сообщение..." 
                    rows={4} 
                    style={{
                        width: "100%",          
                        minHeight: "80px",       
                        
                        background: "#2a323a",   
                        color: "#e7e8ea",        
                        border: "1px solid #3a3a3c", 
                        borderRadius: "8px",    
                        
                        fontSize: "14px",        
                        fontFamily: "inherit",   
                        padding: "12px 16px",  
                        lineHeight: "1.5",      
                        
                        resize: "none",          
                        outline: "none",         
                        boxSizing: "border-box", 
                        transition: "border-color 0.2s ease", 

                        overflowY: "auto",
                        scrollbarWidth: "none",  
                        msOverflowStyle: "none",
                        
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#0072fa"} 
                    onBlur={(e) => e.target.style.borderColor = "#3a3a3c"}  
                />
                <button 
                    onClick={() => {
                        if (isEmpty) return
                        sendMessage(user?.name, user?.pass, messageText)
                    }} 
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    style={{
                        background: isEmpty ? "#3a3a3c" : (isHover ? "#075ac0" : "#0072fa"),
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 10,
                        border: "none",
                        fontSize: 15,
                        color: isEmpty ? "#888" : "#f0f7ff",
                        cursor: isEmpty ? "default" : "pointer",
                        transition: "0.2s"
                    }}
                >
                    отправить
                </button>
            </div>
        </div>
    )
}