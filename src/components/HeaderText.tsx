import { useEffect, useState } from "react"




export default function HeaderText(){
    const [isLoad,setIsLoad]=useState<boolean>(false)
    useEffect(()=>{
        setTimeout(() => {
            setIsLoad(true)
        }, 300);
    },[])
    return(
        <h1
            style={{
                color:"#e7e8ea",
                opacity:isLoad?1:0,
                transform:`translateY(${isLoad?0:-15}px)`,
                transition:"0.5s all",
                position: "relative",
                textAlign:"center",
                margin:40
            }}
        >Расскажи о своем самом жестком провале</h1>

    )
}