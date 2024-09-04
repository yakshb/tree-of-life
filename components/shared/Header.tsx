"use client";

import Link from "next/link";
import { ChevronsUp, Info, MessageSquare } from "lucide-react";
import ThemeToggleButton from "./ThemeToggle";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/TOLai-logo.svg";
import { Button } from "@/components/ui/button";
// import { FeedbackModal } from "./FeedbackModal";
import AboutModal from "./AboutModal";

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-filter bg-white/80 dark:bg-black/80 backdrop-blur-lg bg-opacity-50 border-b-[#343D3F]">
      <div className="mx-auto flex items-center justify-between px-2 py-4 md:px-12">
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
          Genosphere
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* <AboutModal />
          <FeedbackModal /> */}
          {/* <ThemeToggleButton /> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
