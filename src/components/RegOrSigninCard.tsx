import { useContext } from "react"
import MainContext from "../MainContext"

export default function RegOrSigninCard({ children }: { children: any }) {
    const {isMobile }=useContext(MainContext)
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#181b20"
        }}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                width: isMobile?"80%": "25%",
                background: "#20272e",
                borderRadius: 20,
                padding: 30,
                boxSizing: "border-box",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
            }}>
                {children}
            </div>
        </div>
    )
}