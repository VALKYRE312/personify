import React, { useEffect, useState } from "react";

import { Button } from "../components/ui/button";

import { Calendar, Mail, User, Camera, Briefcase, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileCard({ result, personality }) {
  const navigate = useNavigate();

  const DEFAULT_AVATAR = "/default-avatar.png"; // must be in /public

const [profilePic, setProfilePic] = useState(DEFAULT_AVATAR);
   

  // ✅ PUT useEffect HERE (RIGHT AFTER useState)
useEffect(() => {
  const savedPic = localStorage.getItem("pa.profilePic");

  if (savedPic) {
    // 🔥 FIX: ensure backend origin is present
    if (savedPic.startsWith("/static")) {
      setProfilePic(`http://127.0.0.1:5000${savedPic}`);
    } else {
      setProfilePic(savedPic);
    }
  }
}, []);


  // 🔹 Load user data from localStorage
  let user = null;
  try {
    const raw = localStorage.getItem("pa.user");
    user = raw ? JSON.parse(raw) : null;
  } catch {
    user = null;
  }

  const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

     console.log("Uploading file:", file.name);

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res = await fetch("http://127.0.0.1:5000/api/profile/upload-photo", {
      method: "POST",
      body: formData,
    });
     

    console.log("Upload response status:", res.status);

    const data = await res.json();

     console.log("Upload response JSON:", data);

    if (data.imageUrl) {
      const fullUrl = `http://127.0.0.1:5000${data.imageUrl}?t=${Date.now()}`;
      console.log("Setting profilePic to:", fullUrl);
      
      setProfilePic(fullUrl);
      localStorage.setItem("pa.profilePic", fullUrl);
    }
  } catch (err) {
    console.error("Upload failed", err);
  }
};


  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
    : "Your Name";

  const birthday = user?.birthday || "Not set";
  const email = user?.email || "Not set";
  const gender = user?.gender || "Not set";

  const typeCode = result?.type || "XXXX";
  const typeTitle =
    personality?.title || result?.profile?.title || "Your Personality Type";

  // 🔍 PUT IT HERE ⬇⬇⬇
  console.log("PROFILE PIC SRC:", profilePic);

  return (
    <div className="w-full lg:w-1/3 bg-[#3A2C31] border border-[#6C5456] p-8 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.35)] flex flex-col items-center">

      {/* Avatar */}
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#CFA4A8] to-[#B7898E] blur-xl opacity-70" />
        <img
  src={profilePic}
  onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
  className="relative w-28 h-28 rounded-full object-cover border-4 border-[#FDEFF4]"
/>

      </div>

      <label className="mb-5 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium bg-[#CFA4A8] text-[#3A2C31] hover:bg-[#B7898E] transition-all cursor-pointer">
  <Camera className="w-4 h-4" /> Edit Photo
  <input
    type="file"
    accept="image/*"
    hidden
    onChange={handlePhotoChange}
  />
</label>


      {/* Name + Type */}
      <h2 className="text-xl font-semibold text-[#FDEFF4]">
        {fullName}
      </h2>

      <p className="text-sm text-[#D8B4B8] mb-6">
        {typeCode} — {typeTitle}
      </p>

      {/* User Info */}
      <div className="w-full space-y-3 text-sm text-left">
        <p className="flex items-center gap-2">
          <Calendar size={14} /> <strong>Birthday:</strong> {birthday}
        </p>
        <p className="flex items-center gap-2">
          <Mail size={14} /> <strong>Email:</strong> {email}
        </p>
        
      </div>

      {/* Share / Download */}
      <div className="flex gap-4 mt-6 mb-6">
        <Button className="px-6 py-2 rounded-2xl font-medium bg-[#CFA4A8] text-[#3A2C31] hover:bg-[#B7898E] transition-all">
          Share URL
        </Button>
        <Button className="px-6 py-2 rounded-2xl font-medium bg-[#CFA4A8] text-[#3A2C31] hover:bg-[#B7898E] transition-all">
          Download JPG
        </Button>
      </div>

      {/* Counseling Buttons */}
      <div className="w-full mt-10 space-y-4">
        <Button
          onClick={() => navigate("/career-counseling")}
          className="w-full py-3 rounded-2xl bg-[#CFA4A8] text-[#3A2C31] font-medium hover:bg-[#B7898E] transition-all flex items-center justify-center gap-2"
        >
          <Briefcase className="w-4 h-4" /> Career Counseling
        </Button>

        <Button
          onClick={() => navigate("/personalized-therapy")}
          className="w-full py-3 rounded-2xl bg-[#CFA4A8] text-[#3A2C31] font-medium hover:bg-[#B7898E] transition-all flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4" /> Personalized Therapy
        </Button>
      </div>
    </div>
  );
}
