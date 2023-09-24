import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "@firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc
} from "@firebase/firestore";
import { auth, db } from "../../firebase";

export const signUpWithEmail = async (email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        localStorage.setItem("avatar", response.user.photoURL || "")
        return response.user
    } catch (error: any) {
        return error.message;
    }
}

export const signInWithEmail = async (email: string, password: string) => {
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
    } catch (error: any) {
        return error.message;
    }
};

export const logOut = async () => {
    try {
        await signOut(auth)
        localStorage.removeItem("avatar")
    } catch (error: any) {
        return error.message;
    }
};

export const createWorkspace = async (workspace: string) => {
    try {
       const res = await addDoc(collection(db, "workspaces"), { name: workspace, user_id: auth.currentUser?.uid })
       console.log(res)
    } catch (error: any) {
        alert(error.message)
    }
};

export const addBoards = async (id: string, board: string) => {
    try {
        await addDoc(collection(db, "workpaces", id, "boards"), { name: board })
    } catch (error: any) {
        alert(error.message)
    }
};

//   export const leaveChannel =  (id) => {
//     deleteDoc(doc(db, "channels", id)).then((res)=> window.location.reload());
//   };