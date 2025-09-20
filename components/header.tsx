"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          {/* <Link href="/" className="text-2xl font-bold text-balance">
            Asia Pacific Magazine
          </Link> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-emerald-200 transition-colors">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-emerald-200 transition-colors"
            >
              About Us
            </Link>
            {/* <Link
              href="/contact"
              className="hover:text-emerald-200 transition-colors"
            >
              Contact
            </Link> */}
            <Link
              href="/terms"
              className="hover:text-emerald-200 transition-colors"
            >
              Terms
            </Link>
            <Link href="/jobs">
              <Button
                variant="secondary"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
              >
                Apply Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-emerald-500">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="hover:text-emerald-200 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-emerald-200 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-emerald-200 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/terms"
                className="hover:text-emerald-200 transition-colors"
              >
                Terms
              </Link>
              <Link href="/apply">
                <Button
                  variant="secondary"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 w-fit"
                >
                  Apply Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
