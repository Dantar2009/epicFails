import VoteOrDeleteButton from "./VoteOrDeleteButton"

export default function MessageItem({ id, sender, text, rating }: {
    id: number,
    sender: string,
    text: string,
    rating: number
}) {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#303b45",
            padding: 15,
            boxSizing: "border-box",
            borderRadius: 10,
            color: "#e7e8ea"
        }}>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <p style={{ fontWeight: "bold", margin: 0 }}>{sender}</p>
                <div style={{
                    display: "flex",
                    gap: 10,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <p style={{ margin: 0 }}>⭐ {rating}</p>
                    <VoteOrDeleteButton sender={sender} id={id} />
                </div>
            </div>
            <p style={{ margin: "10px 0 0 20px", wordBreak: "break-word",whiteSpace: "pre-wrap" }}>{text}</p>
        </div>
    )
}