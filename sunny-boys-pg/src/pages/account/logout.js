import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import { useEffect } from "react";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn)
    const resetUser = useAppStore(state => state.resetUser)
    const navigate = useNavigate();

    useEffect(() => {
        signOut(firebaseAuth).then(() => {
            setIsLoggedIn(false)
            resetUser()
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }, [])
    return (<></>)
}

export default Logout

