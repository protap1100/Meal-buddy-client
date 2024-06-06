import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../FirebaseConfig/FirebaseConfig";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    
    const signIn =  (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider;
        setLoading(true)
        const auth = getAuth(app);
        return signInWithPopup(auth, provider);
    }

    const GithubSignIn = () =>{
        const githubProvider = new GithubAuthProvider();
        setLoading(true)
        const auth = getAuth(app);
        return signInWithPopup(auth, githubProvider);
    }

    const updateUserProfile = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL
        })
        .then(() => {
            // console.log('Profile updated successfully');
        })
        .catch(() => {
            // console.error('Error updating profile:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
             console.log('User Changing in state',currentUser);  
             setUser(currentUser);
             if(currentUser){
                //Set Json Web Token
                const userInfo ={email : currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        // console.log(res.data.token)
                        localStorage.setItem('access-token',res.data.token);
                    }
                })
             }else{
                // Remove Token From Id
                localStorage.removeItem('access-token');
             }
             setLoading(false);
         } );
         return () =>{
             unSubscribe();
         }
     },[axiosPublic])

    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        GithubSignIn,
        updateUserProfile,
        loading
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;