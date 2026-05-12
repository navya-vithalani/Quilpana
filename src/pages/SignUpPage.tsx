import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fake auth check using localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("quilpana-login-status");

    if (isLoggedIn === "true") {
      navigate("/profile");
    }
  }, [navigate]);

  const errorMessages: Record<string, string> = {
    "invalid-email": "Enter a valid email.",
    "email-already-in-use": "This email is already registered.",
    "weak-password": "Password must be at least 6 characters.",
    "wrong-password": "Incorrect password.",
    "user-not-found": "No account found with this email."
  };

  function getFriendlyMessage(code?: string) {
    return errorMessages[code || ""] || "Something went wrong. Try again.";
  }

  const handleSignup = async (
    email: string,
    password: string,
    username: string,
    age: string
  ) => {

    setError(null);
    setLoading(true);

    // Validate inputs
    if (!email || !password || !username || !age) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("Please enter a valid age.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {

      // Fake delay because humans apparently trust loading screens more than reality
      await new Promise(resolve => setTimeout(resolve, 1200));

      const fakeUser = {
        email,
        username,
        age: ageNum,
        avatarUrl: "default",
        points: 0,
        credits: 0,
        favoriteGames: [],
        totalUpvotes: 0,
        totalDownvotes: 0,
        playerBadges: [],
        creatorBadges: [],
        hasCreated: false
      };

      // Save locally
      localStorage.setItem("quilpana-user", JSON.stringify(fakeUser));
      localStorage.setItem("quilpana-login-status", "true");

      navigate("/profile");

    } catch (err: any) {

      const msg = getFriendlyMessage(err.code);
      setError(msg);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">

        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>

        </div>

        <form
          className="mt-8 space-y-6"

          onSubmit={(e) => {

            e.preventDefault();

            const form = e.target as HTMLFormElement;

            const email =
              (form.elements.namedItem('email') as HTMLInputElement).value;

            const password =
              (form.elements.namedItem('password') as HTMLInputElement).value;

            const username =
              (form.elements.namedItem('username') as HTMLInputElement).value;

            const age =
              (form.elements.namedItem('age') as HTMLInputElement).value;

            handleSignup(email, password, username, age);

          }}
        >

          <div className="rounded-md shadow-sm space-y-4">

            <input
              name="email"
              type="email"
              required
              className="
                appearance-none
                relative
                block
                w-full
                px-3
                py-2
                border
                border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-md
                focus:outline-none
                focus:ring-orange-500
                focus:border-orange-500
                sm:text-sm
              "
              placeholder="Email or Phone Number"
            />

            <input
              name="age"
              type="number"
              required
              className="
                appearance-none
                relative
                block
                w-full
                px-3
                py-2
                border
                border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-md
                focus:outline-none
                focus:ring-orange-500
                focus:border-orange-500
                sm:text-sm
              "
              placeholder="Age"
            />

            <input
              name="username"
              type="text"
              required
              className="
                appearance-none
                relative
                block
                w-full
                px-3
                py-2
                border
                border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-md
                focus:outline-none
                focus:ring-orange-500
                focus:border-orange-500
                sm:text-sm
              "
              placeholder="Username"
            />

            <input
              name="password"
              type="password"
              required
              className="
                appearance-none
                relative
                block
                w-full
                px-3
                py-2
                border
                border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-md
                focus:outline-none
                focus:ring-orange-500
                focus:border-orange-500
                sm:text-sm
              "
              placeholder="Password"
            />

          </div>

          {error && (
            <p className="text-red-600 text-center text-sm">
              {error}
            </p>
          )}

          <div>

            <button
              type="submit"
              disabled={loading}
              className="
                group
                relative
                w-full
                flex
                justify-center
                py-2
                px-4
                border
                border-transparent
                text-sm
                font-medium
                rounded-md
                text-white
                bg-orange-600
                hover:bg-orange-700
                disabled:bg-orange-400
                disabled:cursor-not-allowed
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-orange-500
                transition-colors
              "
            >
              {loading
                ? "Creating account..."
                : "Verify & Sign Up"}
            </button>

          </div>

          <div className="text-xs text-center text-gray-500">
            By signing up, you agree to our Terms of Service.
            OTP verification is fake for now because the backend has been temporarily exorcised. 👁️
          </div>

        </form>

        <p className="text-sm text-center mt-4">

          Already have an account?{" "}

          <button
            onClick={() => navigate("/login")}
            className="text-orange-600 font-medium hover:text-orange-700"
          >
            Log in here
          </button>

        </p>

      </div>

    </div>
  );
};

export default SignUpPage;