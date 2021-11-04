import React, {createContext, useEffect, useState} from 'react';
import {auth} from "../firebase/config";
import {useHistory, useLocation} from "react-router-dom";
import Loading from "../Components/Loading";

export const AuthContext = createContext();

function AuthProvider({children}) {

    const [user, setUser] = useState({});
    const history = useHistory();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
      const unsubscibed =  auth.onAuthStateChanged((user) => {
            if(user)
            {
                const {displayName, photoURL, email, uid} = user;
                setUser({
                    displayName,
                    photoURL,
                    email,
                    uid
                })
                setIsLoading(false)
                if(location.pathname === '/login')
                    history.push('/')
                return;
            }
            else {
                setIsLoading(false)
                history.push("/login")
            }
        })
        return ()=>{unsubscibed()}
    },[history, location])
    return (
        <AuthContext.Provider value={user}>
            {isLoading? <div className="loading"><Loading/></div> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;