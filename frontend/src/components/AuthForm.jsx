import { useState } from "react";

const AuthForm = ({ role, onAuthSuccess }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      onAuthSuccess();
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
        {mode === "signin" ? "Sign In" : "Sign Up"} as {role}
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        {mode === "signin"
          ? "Access your dashboard"
          : "Create a new account"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="text-center mt-4 text-sm text-gray-500">
        {mode === "signin" ? (
          <>
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("signin")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        * Demo authentication (email-based)
      </p>
    </div>
  );
};

export default AuthForm;

