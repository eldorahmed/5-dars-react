import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useGlobalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";

function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPending(true);
      const register = await signInWithPopup(auth, provider);
      const user = register.user;
      console.log(user);
      toast.success(`Welcome ${user.displayName}`)
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      setIsPending(false);
    }
  };

  const registerWithEmailAndPassword = async (email, password,passwordConfirm,displayName,photoURL) => {
    try {
        if(password!==passwordConfirm){
            throw new Error('Passwords not matching!')
        }
      setIsPending(true);
      const register = createUserWithEmailAndPassword(auth, email, password);
      const user = (await register).user;
      await updateProfile(auth.currentUser, {
        photoURL,
        displayName,
      });
      dispatch({type:"LOG_IN",payload:user})
      toast.success(`Welcome ${user.displayName}`)
    setIsPending(false)
    } catch (error) {
        const errorMessage=error.message
        toast.error(errorMessage)
    setIsPending(false)

    }
  };
  return { registerWithGoogle, isPending,registerWithEmailAndPassword };
}

export default useRegister;
