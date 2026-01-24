import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // icon library

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[400px] space-y-4">
        <h2 className="text-2xl font-semibold">Welcome back, explorer!</h2>

        <input
          className="w-full p-3 rounded text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-3 rounded text-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Eye Icon */}
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        </div>

        <button
          className="w-full bg-cyan-400 p-3 rounded"
          onClick={handleLogin}
        >
          Launch into Space →
        </button>

        <p className="text-center">
          Don’t have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up first
          </span>
        </p>
      </div>
    </div>
  );
}
