import { useContext } from "react"
import MainContext from "../MainContext"
import MessageItem from "./MessageItem"




type Mess={
    id:number,
    sender:string,
    text:string,
    rating:number
}
export default function MessageList(){
    const {messages,isMobile}=useContext(MainContext)
    return(
        <div style={{
            display:"flex",
            alignItems:"center",
            width:"100%",
            justifyContent:"center"

        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                gap:15,
                alignItems:'center',
                background:"#20272e",
                width:isMobile?"100%":"40%",
                borderRadius:20,
                padding:10

            }}>
                {messages?.map((item:Mess)=>
                <MessageItem key={item.id} id={item.id} rating={item.rating} sender={item.sender} text={item.text}/>
            )}
            {messages.length===0&&
                <p
                    style={{
                        color:"#e7e8ea"
                    }}
                >Пока нет сообщений. Станьте первым</p>
            }
            </div>
        </div>
    )
}