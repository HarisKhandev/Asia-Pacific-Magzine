import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Asia Pacific Magazine</h3>
            <p className="text-slate-300 leading-relaxed">
              Your premier source for insights, opportunities, and connections across the Asia Pacific region.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Opportunities</h4>
            <div className="space-y-2">
              <Link href="/apply" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Apply Now
              </Link>
              <Link href="/terms" className="block text-slate-300 hover:text-emerald-400 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Contact Info</h4>
            <div className="space-y-2 text-slate-300">
              <p>Asia Pacific Region</p>
              <p>Email: info@apmagazine.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Asia Pacific Magazine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
