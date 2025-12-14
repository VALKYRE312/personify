import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePersonality } from "../context/PersonalityStore";
import PersonalityDimensions from "../components/PersonalityDimensions";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  const { setResult } = usePersonality();

    // ✅ Persist to store/localStorage as soon as we arrive here
  useEffect(() => {
    if (result) setResult(result);
  }, [result, setResult]);

  // fallback if no result passed
  if (!result) {
    return (
      <div className="min-h-screen bg-[#3C2F2F] flex items-center justify-center text-center text-[#F7F4F1]">
        <div>
          <p className="text-xl mb-4">No result found — please take the quiz first.</p>
          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 rounded-full bg-[#DCC7AA] text-[#3C2F2F] font-semibold hover:bg-[#4A8C8C] hover:text-white transition"
          >
            Go to Quiz
          </button>
        </div>
      </div>
    );
  }

  const { type, breakdown, profile } = result;

  return (
    <div className="min-h-screen bg-[#3C2F2F] text-[#F7F4F1] flex justify-center px-4 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#DCC7AA] tracking-wide mb-2">
  {type}
</h1>
<h2 className="text-2xl text-[#F4B8C0] mb-4">{profile.title}</h2>
<p className="max-w-2xl mx-auto text-[#F7F4F1]/90 leading-relaxed">
  {profile.summary}
</p>

        </div>


{/* Traits Breakdown */}
{breakdown && (
  <div className="mb-10">
    <PersonalityDimensions breakdown={breakdown} />
    <div className="flex justify-center gap-4 mt-8">
      

    </div>
  </div>
)}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 rounded-full bg-[#F4B8C0] text-[#3C2F2F] font-semibold hover:bg-[#DCC7AA] transition"
          >
            Retake Quiz
          </button>
         

          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2 rounded-full bg-[#F4B8C0] text-[#3C2F2F] font-semibold hover:bg-[#DCC7AA] transition"
          >
            View Your Profile
          </button>


        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-[#F7F4F1]/70">
          © 2025 Personify — Know Yourself Better 🌱
        </footer>
      </motion.div>
    </div>
  );
}