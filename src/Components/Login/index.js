import React from 'react';
import './login.scss'
import firebase, {auth} from "../../firebase/config";
import {addDocument} from '../../firebase/services'

const ggProvider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {

    const handleGGLogin = async () =>{
       const {additionalUserInfo, user} = await auth.signInWithPopup(ggProvider)
        if(additionalUserInfo.isNewUser)
        {
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId
            })
            addDocument('category',{
                id:'tong-hop',
                name: 'Tổng hợp',
                uid: user.uid,
            })
        }
    }
    const handleFacebook = async () =>{
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider)
         if(additionalUserInfo.isNewUser)
         {
             addDocument('users',{
                 displayName: user.displayName,
                 email: user.email,
                 photoURL: user.photoURL,
                 uid: user.uid,
                 providerId: additionalUserInfo.providerId
             })
             addDocument('category',{
                 id:'tong-hop',
                 name: 'Tổng hợp',
                 uid: user.uid,
             })
         }
     }

    return (
        <div>
            <div className="login flex-column">
                <div className="box-item">
                    <div className="center mb-5">
                        <img src="logo.svg" width="100" />
                    </div>
                    <div className="icon">
                            <div className="btn btn-secondary gg mx-4" onClick={handleGGLogin}>
                                <i className="bi bi-google"/>
                            </div>
                            <div className="btn btn-secondary fb mx-4" onClick={handleFacebook}>
                                <i className="bi bi-facebook"/>
                            </div>
                    </div>
                </div>
             </div>
        </div>
    );
}

export default Login;