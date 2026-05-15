import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onNavigateToSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToSignUp,
}) => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // redirect if already logged in
  useEffect(() => {
    const loggedIn =
      localStorage.getItem("quilpana-login-status");

    if (loggedIn === "true") {
      navigate("/profile");
    }
  }, [navigate]);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrorMsg("");
    setLoading(true);

    const form = e.currentTarget;

    const email =
      form.email.value.trim();

    const password =
      form.password.value.trim();

    // fake validation
    if (!email || !password) {
      setErrorMsg(
        "Please enter both email and password."
      );

      setLoading(false);
      return;
    }

    // tiny fake delay for realism
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    // fake login success
    localStorage.setItem(
      "quilpana-login-status",
      "true"
    );

    localStorage.setItem(
      "quilpana-user-email",
      email
    );

    navigate("/profile");
  };

  return (
    <div className="
      min-h-full
      flex
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    ">
      <div className="
        max-w-md
        w-full
        space-y-8
        bg-white
        p-10
        rounded-2xl
        shadow-xl
      ">
        <div>
          <h2 className="
            text-center
            text-3xl
            font-extrabold
            text-gray-900
          ">
            Welcome Back
          </h2>

          <p className="
            text-center
            text-sm
            text-gray-500
            mt-2
          ">
            Continue your descent into game-dev chaos 🎮
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleLogin}
        >
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="
              w-full
              px-4
              py-3
              border
              border-gray-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-orange-500
            "
          />

          {errorMsg && (
            <p className="
              text-red-500
              text-sm
              text-center
            ">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              bg-orange-600
              hover:bg-orange-700
              disabled:bg-orange-400
              disabled:cursor-not-allowed
              text-white
              rounded-xl
              font-semibold
              transition-all
              duration-300
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p className="
          text-sm
          text-center
          text-gray-600
        ">
          Don't have an account?{" "}

          <button
            onClick={onNavigateToSignUp}
            className="
              text-orange-600
              font-semibold
              hover:underline
            "
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;