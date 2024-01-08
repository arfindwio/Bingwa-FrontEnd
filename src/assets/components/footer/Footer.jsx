import React from "react";

// Icons
import {
  FaSquareWhatsapp,
  FaSquareInstagram,
  FaSquareGithub,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="bg-blue pb-6 pt-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Bagian 1 */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Team Front End
          </h2>
          <div className="text-white">
            <div className="py-3">
              <div>
                <p>Ferry Febriansyah</p>
                <p>Bagus Dwi Putra Adiyono</p>
                <p>Radhiya Sabila</p>
                <p>Adinda Wahyu Sri Suprihatin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian 2 */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Team Back End
          </h2>
          <div className="text-white">
            <div className="py-3">
              <div>
                <p>Moh Hafid Nur Firmansyah</p>
                <p>Arfin Dwi Octavianto</p>
                <p>Shera Alice Ayutri</p>
                <p>Muhammad Afif Mu'tashim</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian 3 */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-white">Quick Links</h2>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a href="/" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/all-kelas" className="text-white hover:underline">
                Courses
              </a>
            </li>
          </ul>
        </div>

        {/* Bagian 4 */}
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-white">Connect</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-4 text-white">
              <FaSquareGithub size={50} className="cursor-pointer" />
              <FaSquareInstagram size={50} className="cursor-pointer" />
              <FaSquareWhatsapp size={50} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} Copyright | This Template is made by
          College Student Binar Batch 5 | All Rights Reserved
        </p>
      </div>
    </div>
  );
};
