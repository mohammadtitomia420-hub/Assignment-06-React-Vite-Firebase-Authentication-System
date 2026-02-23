import { useState } from "react";
import { auth, googleProvider, githubProvider } from "../firebase/auth";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGithubRegister = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleEmailRegister}
        className="flex flex-col gap-3 bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
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
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          minLength={6}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Register with Google
        </button>
        <button
          type="button"
          onClick={handleGithubRegister}
          className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          Register with GitHub
        </button>
      </form>
    </div>
  );
}
