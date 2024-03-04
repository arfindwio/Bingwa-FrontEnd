import React from "react";

// Icons
import { FcGoogle } from "react-icons/fc";

export const LoginGoogle = () => {
  const handleLoginGoogle = async () => {
    window.location = `${process.env.REACT_APP_SERVER}/users/google`;
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
