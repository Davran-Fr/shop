import React from "react";
import { links } from "../header/links";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

const Fotoer = () => {
  return (
    <div className="w-full bg-footerBacl font-world text-black ">
      <div className="container mx-auto gap-10 px-4 flex flex-col items-center py-20">
        <h5 className="font-agamtoh text-5xl text-center">DvG</h5>
        <div className="flex gap-5 items-center flex-col 350:flex-row ">
          {links.map((items, i) => {
            return <Link key={i} href={items.href}>{items.name}</Link>;
          })}
        </div>
        <div className="flex items-center  gap-10 flex-col 350:flex-row  justify-between">
          <p>dvgecommerce@gmail.com</p>
          <div className="flex gap-3">
            <FaInstagram />
            <BsTwitterX/>
            <FaFacebookF />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fotoer;
