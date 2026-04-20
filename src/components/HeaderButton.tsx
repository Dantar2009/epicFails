import { useState } from "react"


export default function HeaderButton({ text, func}:{text:string,func:()=>void}){
    const [clicked,setClicked]=useState<boolean>(false)
    const [isHover,setIsHover]=useState<boolean>(false)
    return(

        <button
            style={{
                background:isHover?"#075ac0":"#0077ff",
                paddingTop:5,
                paddingBottom:5,
                paddingLeft:10,
                paddingRight:10,
                height:40,
                borderRadius:10,
                border:"none",
                opacity:clicked?0.75:1,
                fontSize:15,
                color:"#f0f7ff"
            }}
            onClick={()=>{
                setClicked(true)
                func()
                setTimeout(()=>{
                    setClicked(false)
                }, 200)
            }}
            onMouseEnter={()=>{
                setIsHover(true)
            }}
            onMouseLeave={()=>{
                setIsHover(false)
            }}
        >{text}</button>
    )
}