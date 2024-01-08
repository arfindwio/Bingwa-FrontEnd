import React from 'react';

export const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-secondary">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="font-bold text-9xl text-primary">404</div>
        <div className="text-2xl font-semibold tracking-wider text-slate-500">
          HALAMAN TIDAK DITEMUKAN
        </div>
      </div>
      <div className="px-3 py-2 text-lg font-semibold transition-all border-2 cursor-pointer text-slate-200 rounded-xl bg-primary hover:border-primary hover:bg-secondary hover:text-primary">
        <a href="/">Kembali ke Homepage</a>
      </div>
    </div>
  );
};
