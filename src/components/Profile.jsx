import { useGlobalContext } from "../context/GlobalContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
function Profile() {
  const signOutProfile = async () => {
    await signOut(auth);
    toast.success("See you soon!");
  };
  const { user } = useGlobalContext();
  console.log(user)
  return (
    <div className="container  px-3 sm:px-10 max-w-[1380px] mx-auto">
      <div className="card card-side bg-base-100 shadow-xl px-6 mt-28">
        <figure>
          <img className="rounded-full" src={user.photoURL} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title mt-8">{user.email}</h2>
          <p className="text-2xl mt-8">{user.displayName}</p>
          <div className="card-actions justify-end">
            <button onClick={signOutProfile} className="btn btn-custom">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
