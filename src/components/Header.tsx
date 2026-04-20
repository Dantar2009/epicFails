

export default function Header({children}:{children:any}){
    return(
        <div style={{
            display:"flex",
            flexDirection:"row-reverse",
            gap:15,
            padding:10,
            width:"100%",
            boxSizing: "border-box", 
            background:"#20272e",
            alignItems:"center"

        }}>
            {children}
        </div>
    )
}