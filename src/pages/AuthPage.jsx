import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => setIsRegister(!isRegister);

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleEmail}
        className="flex flex-col gap-3 bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold text-center">
          {isRegister ? "Register" : "Login"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          minLength={6}
          required
        />
        <button
          type="submit"
          className={`py-2 rounded text-white ${
            isRegister ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <div className="flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={() => handleSocialLogin(googleProvider)}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            {isRegister ? "Register with Google" : "Login with Google"}
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin(githubProvider)}
            className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            {isRegister ? "Register with GitHub" : "Login with GitHub"}
          </button>
        </div>

        <p className="text-center mt-2 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={toggleForm}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
