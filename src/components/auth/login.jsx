import React, { useState } from "react";
import { getAuthorization } from "../../services/authorization/authorization";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onClickLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await getAuthorization.login({ userName: username, password: password });
      
      // Save token & user to localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));


      // Redirect to dashboard or home
      toast.success("Login succesfully.")
      navigate("/dashboard");
    } catch (err) {
      console.log('err mesage', err.response.data.errorMessage );
      setError(err.response?.data?.errorMessage || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gradient-to-br from-gray-800 to-black">
      <div className="w-96 rounded-xl shadow-2xl p-8 bg-gray-400/30 backdrop-blur-lg border border-gray-300/40">
        <h2 className="text-2xl font-bold text-center text-white mb-6 drop-shadow">
          Login
        </h2>
        <form className="space-y-4" onSubmit={onClickLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-gray-500/80 text-white backdrop-blur-sm hover:bg-gray-600/90 transition duration-200 hover:cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
