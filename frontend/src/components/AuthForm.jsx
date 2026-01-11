import { useState } from "react";
import { supabase } from "../supabaseClient";

const AuthForm = ({ role, onAuthSuccess }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inputClass = `
    w-full px-4 py-3 rounded-lg border
    border-gray-300 dark:border-gray-700
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (mode === "signup") {
    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role.toLowerCase(),
          name,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful. You can now sign in.");
    setMode("signin");
  }

  if (mode === "signin") {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // ✅ extract role from Supabase user metadata
  const userRole = data.user.user_metadata?.role;

  if (!userRole) {
    alert("User role not found. Please contact support.");
    return;
  }

  // ✅ store auth info locally
  localStorage.setItem("token", data.session.access_token);
  localStorage.setItem("role", userRole);

  // ✅ notify parent
  onAuthSuccess(data.user);
}

};


  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-1">
        {mode === "signin" ? "Sign In" : "Sign Up"} as {role}
      </h2>

      <p className="text-sm text-center mb-6 opacity-70">
        {mode === "signin" ? "Access your dashboard" : "Create a new account"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="text-center mt-4 text-sm opacity-70">
        {mode === "signin" ? (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
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
              type="button"
              onClick={() => setMode("signin")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

