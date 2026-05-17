import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // ✅ FIXED: set initial data only once (no overwrite)
  useEffect(() => {
    if (user && !isDataLoaded) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setIsDataLoaded(true);
    }
  }, [user, isDataLoaded]);

  // ⏳ Wait for Firebase
  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  // 🔐 If not logged in
  if (!user) {
    return <h2 className="text-center mt-10">Please login first</h2>;
  }

  // ✅ Update profile
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

        // 🔥 optional: refresh UI
        setIsDataLoaded(false); // re-sync updated data
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">

        {/* 👤 Profile Info */}
        <div className="text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kR0K5f/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-primary"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user?.displayName || "No Name"}
          </h2>

          <p className="text-gray-600">{user?.email}</p>

          <p className="text-sm text-gray-500 mt-2">
            Last Login: {user?.metadata?.lastSignInTime}
          </p>
        </div>

        {/* ✏️ Update Form */}
        <form onSubmit={handleUpdateProfile} className="mt-8 space-y-4">

          <div>
            <label className="label font-semibold">Update Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Update Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>

          <button className="btn btn-primary w-full">
            Save Changes
          </button>

          {/* ✅ Success */}
          {success && (
            <p className="text-green-600 text-center font-medium">
              {success}
            </p>
          )}

          {/* ❌ Error */}
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