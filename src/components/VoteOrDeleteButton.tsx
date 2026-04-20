import { useContext, useState } from "react"
import MainContext from "../MainContext"
import { ArrowUp, Trash2 } from "lucide-react"

export default function VoteOrDeleteButton({ sender, id }: { sender: string, id: number }) {
    const { user, deleteMessage, voteMessage } = useContext(MainContext)
    const [isHover,setIsHover]=useState<boolean>(false)
    return (
        <>
            {user?.name === sender ? (
                <button 
                    onPointerEnter={()=>setIsHover(true)}
                    onPointerLeave={()=>setIsHover(false)}
                    onClick={() => deleteMessage(user?.name, user?.pass, id)} 
                    style={{
                        cursor: "pointer",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "none",
                        background: isHover?"#24292e":"#2f3b44",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Trash2 size={14} color="#e7e8ea" />
                </button>
            ) : (
                <button 
                    onPointerEnter={()=>setIsHover(true)}
                    onPointerLeave={()=>setIsHover(false)}
                    onClick={() => voteMessage(user?.name, user?.pass, id)} 
                    style={{
                        cursor: "pointer",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "none",
                        background: isHover?"#24292e":"#2f3b44",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ArrowUp size={16} color="#e7e8ea" />
                </button>
            )}
        </>
    )
}