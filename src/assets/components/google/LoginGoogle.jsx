import React from "react";

// Icons
import { FcGoogle } from "react-icons/fc";

export const LoginGoogle = () => {
  const handleLoginGoogle = async () => {
    // window.location = "https://bingwa-b11.vercel.app/api/v1/users/google";
    window.location = "http://localhost:8000/api/v1/users/google";
  };

  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-slate-600 bg-white py-2"
      onClick={handleLoginGoogle}
    >
      <FcGoogle size={30} />
      <span className="font-semibold">Masuk dengan Google</span>
    </div>
  );
};
