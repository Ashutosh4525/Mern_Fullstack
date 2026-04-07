'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser, changeCurrentPassword } from "@/store/authSlice";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    avatar: null
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    } else {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        avatar: null
      });
      if (user.avatar?.url) {
        setAvatarPreview(user.avatar.url);
      }
    }
  }, [user, dispatch]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const updatePayload = { ...formData };
    if (!updatePayload.avatar) {
      delete updatePayload.avatar; // Don't send avatar if not changed
    }

    try {
      await dispatch(updateUser(updatePayload)).unwrap();
      // Success message could be shown here
    } catch (err) {
      // Error is handled by redux
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!passwordData.oldPassword || !passwordData.newPassword) {
      return;
    }

    try {
      await dispatch(changeCurrentPassword(passwordData)).unwrap();
      setPasswordData({ oldPassword: "", newPassword: "" });
      // Success message could be shown here
    } catch (err) {
      // Error is handled by redux
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
        <div className="mx-auto max-w-md text-center">
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold">Profile Settings</h1>
          <p className="mt-2 text-neutral-400">Manage your account information and preferences</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-amber-300 text-amber-300"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "password"
                ? "border-b-2 border-amber-300 text-amber-300"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Change Password
          </button>
          <Link
            href="/change-password"
            className="px-6 py-3 text-sm font-medium text-neutral-400 hover:text-white"
          >
            OTP Password Change
          </Link>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="rounded-4xl border border-white/10 bg-white/4 p-8">
            <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl text-neutral-400">
                        {user.firstname?.[0]?.toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-amber-300 text-black rounded-full p-2 cursor-pointer hover:bg-amber-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Click the + icon to change your avatar</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange("firstname", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange("lastname", e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-amber-300"
                />
              </div>

              {error && <p className="text-sm text-rose-300">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60 hover:bg-amber-400 transition-colors"
              >
                {status === "loading" ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="rounded-4xl border border-white/10 bg-white/4 p-8">
            <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
            <p className="text-neutral-400 mb-6">
              Enter your current password and choose a new one.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-amber-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-amber-300"
                  required
                />
              </div>

              {error && <p className="text-sm text-rose-300">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60 hover:bg-amber-400 transition-colors"
              >
                {status === "loading" ? "Changing..." : "Change Password"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/change-password" className="text-sm text-amber-300 hover:text-amber-400">
                Prefer OTP-based password change?
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}