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
    // deleteDoc,
    // doc
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

export const addBoard = async (id: string, board: string, bg:string) => {
    try {
        const res = await addDoc(collection(db, "workspaces", id, "boards"), { name: board, bg })
        await addList(id, res.id, "To do", 1 )
        await addList(id, res.id, "In progress", 2 )
        await addList(id, res.id, "Done", 3 )
    } catch (error: any) {
        alert(error.message)
    }
};

export const addList = async (w_id: string, b_id:string, name:string, order:number) => {
    try {
        await addDoc(collection(db, "workspaces", w_id, "boards", b_id, "lists"), { name, order })
    } catch (error: any) {
        alert(error.message)
    }
};

//   export const leaveChannel =  (id) => {
//     deleteDoc(doc(db, "channels", id)).then((res)=> window.location.reload());
//   };