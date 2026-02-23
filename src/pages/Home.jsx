import { auth } from "../firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome To Home Page</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Logout
      </button>
     
    </div>
  );
}
