"use client";

import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";

const links = [
  { title: "Main", href: "/settings" },
  { title: "Account", href: "/settings/account" },
  { title: "Orders", href: "/settings/my-orders" },
];

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <ul className="flex lg:flex-col justify-center text-lg lg:justify-start gap-x-10 lg:divide-y-1px divide-gray-400">
      {links.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href} className="py-3">
            <Link
              href={item.href}
              className={isActive ? "text-slate-500 font-bold" : "text-black"}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
