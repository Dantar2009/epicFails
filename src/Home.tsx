import { useContext } from "react"
import MainContext from "./MainContext"
import HeaderText from "./components/HeaderText"
import Header from "./components/Header"
import HeaderButton from "./components/HeaderButton"
import MessageList from "./components/MessageList"
import MessageInput from "./components/MessageInput"


function Home(){
    const {user,toSignin,toRegister,signOut}=useContext(MainContext)
    return(
        <div>
            <Header>

                {user?(
                    <>
                        <HeaderButton text="Выйти" func={signOut}/>
                        <p style={{ 
                            color: "#e7e8ea", 
                            fontSize: 15, 
                            margin: 0, 
                            padding: "0 5px",
                            fontWeight: 500 
                        }}>{user.name}</p>
                    </>
                )
                :(
                    <>
                        <HeaderButton text="Вход" func={toSignin}/>
                        <HeaderButton text="Регистрация" func={toRegister}/>
                    </>
                )
            }
            </Header>
            <HeaderText/>
            <MessageInput/>
            <MessageList/>
        </div>
    )
}
export default Home