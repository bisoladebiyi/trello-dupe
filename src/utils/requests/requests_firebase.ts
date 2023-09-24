import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword
  } from "@firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
} from "@firebase/firestore";
import { auth, db } from "../../firebase";

export const signUpWithEmail = async(email:string, password:string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        localStorage.setItem("avatar", response.user.photoURL || "")
        return response.user
    } catch (error: any) {
        return error.message;
    }
}

export const signInWithEmail = async(email:string, password:string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem("avatar", response.user.photoURL || "")
        return response.user
    } catch (error: any) {
        return error.message;
    }
}
  
  
export const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const response = await signInWithPopup(auth, provider);
        localStorage.setItem("avatar", response.user.photoURL || "")
        return response.user
    } catch (error:any) {
        return error.message;
    }
};
  
export const logOut = async() => {
    try {
        await signOut(auth)
        localStorage.removeItem("avatar")
    } catch (error:any) {
        return error.message;
    }
};



  
//   export const createChannel = (newChannel) => {
//     addDoc(collection(db, "channels"), { names: newChannel })
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   };
  
//   export const addMessages =  (value, id, user) => {
//     const messages = {
//       message: value,
//       timestamp: serverTimestamp(),
//       user,
//     };
//       addDoc(collection(db, "channels", id, "messages"), messages).then((res)=> console.log(res)).catch((err)=> console.log(err))
    
//   };
//   export const leaveChannel =  (id) => {
//     deleteDoc(doc(db, "channels", id)).then((res)=> window.location.reload());
//   };