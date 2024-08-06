"use client";

import Link from "next/link";
import { ChevronsUp } from "lucide-react";
import ThemeToggleButton from "./ThemeToggle";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/TOLai-logo.svg"

const links = [
  { href: "/about", text: "About" },
  { href: "/contribute", text: "Contribute" },
  { href: "/blog", text: "On Life" },
];

const Header = () => (
  <nav className="sticky top-0 z-50 backdrop-filter bg-white/80 dark:bg-black/80 backdrop-blur-lg bg-opacity-50 border-b-[#343D3F]">
    <div className="mx-auto flex items-center justify-between px-2 py-6 md:px-12">
      <Link
        className="gap-3 flex flex-row align-middle items-center group text-2xl md:text-3xl font-semibold tracking-tight"
        href="/"
      >
        <Image
        src={logo}
        alt="Tree of Life Explorer AI Logo"
        width={40}
        height={40}
        />
        Tree of Life Explorer
      </Link>

      <div className="flex items-center space-x-4 md:space-x-6">
        {/* <ThemeToggleButton /> */}
      </div>
    </div>
  </nav>
);

export default Header;
