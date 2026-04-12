import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 🔥 Sync state when user loads
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  // 🔥 Wait for Firebase
  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        Loading...
      </h2>
    );
  }

  // 🔐 If not logged in
  if (!user) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold text-red-500">
        Please login first
      </h2>
    );
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setSuccess("✅ Profile updated successfully");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">

        {/* Profile Info */}
        <div className="text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kR0K5f/user.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">
            {user?.displayName || "No Name"}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn btn-primary w-full">
            Save Changes
          </button>

          {success && (
            <p className="text-green-600 font-semibold text-center">
              {success}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;