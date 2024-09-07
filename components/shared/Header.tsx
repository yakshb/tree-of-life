"use client";

import Link from "next/link";
import { ChevronsUp, Info, MessageSquare } from "lucide-react";
import ThemeToggleButton from "./ThemeToggle";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/GENOSPHERE.svg";
import { Button } from "@/components/ui/button";
// import { FeedbackModal } from "./FeedbackModal";
import AboutModal from "./AboutModal";

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-filter bg-transparent/1 border-b  backdrop-blur-lg bg-opacity-50 border-b-[#dcffdc]">
      <div className="mx-auto flex items-center justify-between px-2 py-2 md:py-0 md:px-12">
        <Link
          className="gap-3 flex flex-row align-middle items-center group text-2xl md:text-3xl font-semibold tracking-tight"
          href="/"
        >
          <Image
            src={logo}
            alt="Tree of Life Explorer AI Logo"
            width={250}
            height={100}
            className="w-[150px] md:w-[250px] h-auto"
          />
          
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <AboutModal />
        </div>
      </div>
    </nav>
  );
};

export default Header;
