import React from "react";
import { useSelector } from "react-redux";

// Component
import { FooterSkeleton } from "../skeleton/FooterSkeleton";

// Icons
import {
  FaSquareWhatsapp,
  FaSquareInstagram,
  FaSquareGithub,
} from "react-icons/fa6";

export const Footer = () => {
  const isLoading = useSelector((state) => state.courses.loading);
  return (
    <>
      {isLoading ? (
        <FooterSkeleton />
      ) : (
        <div className="bg-blue px-6 pb-6 pt-12 lg:px-28">
          <div className="flex flex-col gap-3 pb-4 sm:justify-between lg:flex-row lg:gap-1 lg:pb-2 xl:gap-0">
            {/* Bagian 1 */}
            <div className="2/4 flex flex-col">
              <h2 className="mb-2 text-4xl font-bold text-white">Bingwa</h2>
              <div className="flex flex-col gap-2 py-3 text-white">
                <p>
                  123 Main Street, Anytown, CA 91234, United States of America
                </p>
                <p>arfindwioctavianto@gmail.com</p>
                <p>
                  <span className="mr-1 font-bold">+62</span>812-3333-4808
                </p>
              </div>
            </div>

            {/* Bagian 2 */}
            <div className="1/4 flex flex-col">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Quick Links
              </h2>
              <ul className="list-none p-0">
                <li className="text-md mb-2 font-semibold lg:text-lg">
                  <a href="/" className="text-white hover:underline">
                    Home
                  </a>
                </li>
                <li className="text-md mb-2 font-semibold lg:text-lg">
                  <a href="/all-kelas" className="text-white hover:underline">
                    Courses
                  </a>
                </li>
              </ul>
            </div>

            {/* Bagian 3 */}
            <div className="1/4 flex flex-col">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Connect
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-4 text-white">
                  <FaSquareGithub size={50} className="cursor-pointer" />
                  <FaSquareInstagram size={50} className="cursor-pointer" />
                  <FaSquareWhatsapp size={50} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 pb-16 pt-6 text-center text-white md:pb-0">
            <p className="font-semibold">
              &copy; {new Date().getFullYear()} Copyright arfindwio. All Rights
              Reserved
            </p>
          </div>
        </div>
      )}
    </>
  );
};
