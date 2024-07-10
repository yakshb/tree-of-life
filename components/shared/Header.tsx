"use client";

import Link from "next/link";
import { ChevronsUp } from "lucide-react";
import ThemeToggleButton from "./ThemeToggle";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#about", text: "About" },
  { href: "/#projects", text: "Projects" },
  { href: "/#contact", text: "Contact" },
  { href: "/blog", text: "On Life" },
];

const Header = () => (
  <nav className="sticky top-0 z-50 backdrop-filter bg-white/80 dark:bg-black/80 backdrop-blur-lg bg-opacity-50 border-b-[#343D3F]">
    <div className="mx-auto flex items-center justify-between px-2 py-6 md:px-12">
      <Link
        className="group text-2xl md:text-3xl font-semibold tracking-tight"
        href="/"
      >
        Tree of Life Explorer
      </Link>

      <div className="flex items-center space-x-4 md:space-x-6">
        <ThemeToggleButton />
        {/* <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetHeader></SheetHeader>
            <SheetContent side="right">
              <div className="flex flex-col items-start gap-6">
                <nav>
                  <ul className="flex flex-col gap-4">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className="hover:text-gray-400 hover:scale-105 transition-colors"
                          href={link.href}
                        >
                          <SheetClose>{link.text}</SheetClose>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="items-center flex mt-10 space-x-4">
                <Link
                  className="dark:hover:text-indigo-300 transition-colors"
                  href="https://www.linkedin.com/in/yakshb/"
                >
                  <LinkedinIcon className="h-6 w-6" />
                </Link>
                <Link
                  className="dark:hover:text-indigo-300 transition-colors"
                  href="https://github.com/yakshb"
                >
                  <GithubIcon className="h-6 w-6" />
                </Link>
                <Link
                  className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  href="https://twitter.com/yaksh_birla"
                >
                  <TwitterIcon className="h-6 w-6" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              className="hover:text-gray-400 hover:scale-105 transition-colors"
              href={link.href}
            >
              {link.text}
            </Link>
          ))}
        </nav> */}
      </div>
    </div>
  </nav>
);

export default Header;
