import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Responsive layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:gap-8">
          {/* First column - take more space */}
          <div className="flex-1 md:max-w-2xl mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              Physiograph
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The Progressive amplifies underrepresented voices, championing
              grassroots politics, civil liberties, human rights, economic
              justice, environmental health, and democracy. Stay updated on
              global activism with us.
            </p>
          </div>

          {/* Other columns - auto width */}
          <div className="mb-8 md:mb-0">
            <h4 className="font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-slate-300 hover:text-emerald-400"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-slate-300 hover:text-emerald-400"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-slate-300 hover:text-emerald-400"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="mb-8 md:mb-0">
            <h4 className="font-semibold mb-4 text-emerald-400">
              Opportunities
            </h4>
            <div className="space-y-2">
              <Link
                href="/apply"
                className="block text-slate-300 hover:text-emerald-400"
              >
                Apply Now
              </Link>
              <Link
                href="/terms"
                className="block text-slate-300 hover:text-emerald-400"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">
              Contact Info
            </h4>
            <div className="space-y-2 text-slate-300">
              <p>Email: info@apmagazine.com</p>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Asia Pacific Magazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
