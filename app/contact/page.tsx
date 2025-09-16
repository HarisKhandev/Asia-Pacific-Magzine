import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 text-balance">Get in Touch</h1>
            <p className="text-xl text-slate-600 leading-relaxed text-pretty">
              Have questions about our magazine, remote opportunities, or want to connect with our team? We'd love to
              hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardContent className="pt-0">
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} />
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <Mail className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-slate-600 mb-2">General inquiries:</p>
                  <p className="text-emerald-600 font-semibold">info@apmagazine.com</p>
                  <p className="text-slate-600 mb-2 mt-4">Career opportunities:</p>
                  <p className="text-emerald-600 font-semibold">careers@apmagazine.com</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <Phone className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-slate-600 mb-2">Main office:</p>
                  <p className="text-emerald-600 font-semibold">+1 (555) 123-4567</p>
                  <p className="text-slate-600 mb-2 mt-4">HR department:</p>
                  <p className="text-emerald-600 font-semibold">+1 (555) 123-4568</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <MapPin className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                  <p className="text-slate-600">
                    Asia Pacific Magazine
                    <br />
                    123 Business District
                    <br />
                    Singapore 018956
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <Clock className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                  <div className="space-y-2 text-slate-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM (SGT)</p>
                    <p>Saturday: 10:00 AM - 2:00 PM (SGT)</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
