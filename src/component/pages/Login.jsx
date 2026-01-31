import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify';

const Login = () => {
  const { singInUser, signInWithGoogle, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path (private route support)
  const from = location.state?.from?.pathname || '/';

  // 🔹 Email & Password Login
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    singInUser(email, password)
      .then((result) => {
        e.target.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(
          error.message || 'Login failed. Please check your credentials.'
        );
      });
  };

  // 🔹 Google Login
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error('Google sign-in failed. Try again.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow mb-16">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 border rounded hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        <h1 className="font-bold my-2">or</h1>

        <Link className="btn w-full bg-pink-400" to="/register">
          Create user
        </Link>
      </div>

      {/* Toast Messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
