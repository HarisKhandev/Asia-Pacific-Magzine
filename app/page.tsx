import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ColumnistCard } from "@/components/columnist-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, Briefcase, TrendingUp, Star, Award, Target, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const columnists = [
  {
    name: "Dr. Sarah Chen",
    expertise: "Economic Analysis",
    image: "/placeholder-4dlqp.png",
    description:
      "Leading economist specializing in Asia Pacific markets with 15+ years of experience in financial analysis.",
  },
  {
    name: "Michael Tanaka",
    expertise: "Technology Innovation",
    image: "/placeholder-b9jjg.png",
    description:
      "Tech industry veteran covering emerging technologies, startups, and digital transformation across the region.",
  },
  {
    name: "Dr. Priya Sharma",
    expertise: "Sustainable Development",
    image: "/placeholder-63lut.png",
    description:
      "Environmental policy expert focusing on sustainable business practices in developing economies.",
  },
  {
    name: "James Liu",
    expertise: "Business Strategy",
    image: "/placeholder-be0ae.png",
    description:
      "Strategic business consultant helping companies navigate complex market dynamics and expansion opportunities.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance animate-fade-in-up">
              Asia Pacific's Premier
              <span className="text-emerald-600 animate-pulse"> Business Magazine</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed text-pretty animate-fade-in-up animation-delay-300">
              Connecting opportunities, insights, and talent across the dynamic Asia Pacific region. Join our network of
              industry experts and discover remote career opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Browse Job Opportunities
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-slate-600">Remote Positions</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-slate-600">Expert Columnists</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-4xl font-bold text-emerald-600 mb-2">15</div>
              <div className="text-slate-600">Countries Covered</div>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              Experience the future of remote work with our innovative platform designed for the Asia Pacific region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up group">
              <CardContent className="pt-6">
                <Globe className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:animate-spin transition-transform duration-500" />
                <h3 className="text-xl font-bold mb-2">Regional Coverage</h3>
                <p className="text-slate-600">Comprehensive insights across all Asia Pacific markets</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up animation-delay-200 group">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:animate-bounce transition-transform duration-500" />
                <h3 className="text-xl font-bold mb-2">Expert Network</h3>
                <p className="text-slate-600">Connect with industry-leading columnists and experts</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up animation-delay-400 group">
              <CardContent className="pt-6">
                <Briefcase className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:animate-pulse transition-transform duration-500" />
                <h3 className="text-xl font-bold mb-2">Remote Opportunities</h3>
                <p className="text-slate-600">Flexible remote positions with leading professionals</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up animation-delay-600 group">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:animate-pulse transition-transform duration-500" />
                <h3 className="text-xl font-bold mb-2">Growth Focus</h3>
                <p className="text-slate-600">Career development and professional advancement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">
              Magazine Highlights
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              Discover what makes our fortnightly publication the go-to source for Asia Pacific business insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-emerald-200 transition-colors duration-300">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Content</h3>
              <p className="text-slate-600">
                In-depth analysis and exclusive interviews with industry leaders across the region.
              </p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-emerald-200 transition-colors duration-300">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Award-Winning</h3>
              <p className="text-slate-600">Recognized for excellence in business journalism and digital innovation.</p>
            </div>

            <div className="text-center animate-fade-in-up animation-delay-400">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-emerald-200 transition-colors duration-300">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Targeted Insights</h3>
              <p className="text-slate-600">Focused coverage on emerging markets and growth opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">
              Meet Our Distinguished Columnists
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              Work alongside industry experts as their remote assistants. Gain invaluable experience while supporting
              thought leaders across various sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {columnists.map((columnist, index) => (
              <div key={index} className={`animate-fade-in-up animation-delay-${(index + 1) * 200}`}>
                <ColumnistCard {...columnist} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up animation-delay-800">
            <Link href="/jobs">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Available Positions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">Success Stories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              Hear from professionals who have transformed their careers through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Lisa Wang</h4>
                    <p className="text-sm text-slate-600">Remote Assistant</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "Working with Dr. Chen has been transformative. I've gained insights into economic analysis while
                  maintaining perfect work-life balance."
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">David Kim</h4>
                    <p className="text-sm text-slate-600">Tech Assistant</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "Supporting Michael's tech coverage has opened doors to the startup ecosystem I never knew existed.
                  Amazing opportunities!"
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-400">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Maria Santos</h4>
                    <p className="text-sm text-slate-600">Strategy Assistant</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "James Liu's mentorship in business strategy has accelerated my career beyond my expectations. Highly
                  recommend!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">
                    Stay Ahead of the Curve
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
                    Get exclusive insights, job alerts, and industry trends delivered to your inbox every week.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in-up animation-delay-400">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 transform hover:scale-105 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>

                <p className="text-sm text-slate-500 text-center mt-4">
                  Join 10,000+ professionals. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">
              Featured Articles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              Dive into our latest insights and analysis from across the Asia Pacific region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up group">
              <div className="relative">
                <img
                  src="/modern-office-building-in-singapore-skyline.jpg"
                  alt="Singapore Business District"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-600 text-white">Economics</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                  Singapore's Economic Resilience in 2024
                </h3>
                <p className="text-slate-600 mb-4">
                  Dr. Sarah Chen analyzes the factors driving Singapore's continued economic growth despite global
                  uncertainties.
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Dr. Sarah Chen</span>
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-200 group">
              <div className="relative">
                <img
                  src="/tech-startup-office-with-modern-computers-and-scre.jpg"
                  alt="Tech Innovation"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">Technology</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                  The Rise of AI Startups in Southeast Asia
                </h3>
                <p className="text-slate-600 mb-4">
                  Michael Tanaka explores the booming artificial intelligence ecosystem across Southeast Asian markets.
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Michael Tanaka</span>
                  <span>7 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up animation-delay-400 group">
              <div className="relative">
                <img
                  src="/green-energy-solar-panels-and-wind-turbines-in-asi.jpg"
                  alt="Sustainable Energy"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">Sustainability</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                  Green Energy Transition in Asia Pacific
                </h3>
                <p className="text-slate-600 mb-4">
                  Dr. Priya Sharma examines the renewable energy initiatives transforming the region's power landscape.
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Dr. Priya Sharma</span>
                  <span>6 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in-up animation-delay-600">
            <Button
              variant="outline"
              size="lg"
              className="transform hover:scale-105 transition-all duration-300 bg-transparent"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">Our Journey</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              From a small publication to the leading business magazine in the Asia Pacific region.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-emerald-200"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                <div className="relative flex items-center animate-fade-in-up">
                  <div className="flex-1 pr-8 text-right">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Founded</h3>
                      <p className="text-slate-600">Started as a quarterly newsletter focusing on emerging markets</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 pl-8">
                    <div className="text-2xl font-bold text-emerald-600">2010</div>
                  </div>
                </div>

                <div className="relative flex items-center animate-fade-in-up animation-delay-200">
                  <div className="flex-1 pr-8 text-right">
                    <div className="text-2xl font-bold text-emerald-600">2015</div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 pl-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Transformation</h3>
                      <p className="text-slate-600">Launched online platform and expanded to fortnightly publication</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center animate-fade-in-up animation-delay-400">
                  <div className="flex-1 pr-8 text-right">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Remote Work Pioneer</h3>
                      <p className="text-slate-600">First to offer remote assistant positions with industry experts</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="flex-1 pl-8">
                    <div className="text-2xl font-bold text-emerald-600">2020</div>
                  </div>
                </div>

                <div className="relative flex items-center animate-fade-in-up animation-delay-600">
                  <div className="flex-1 pr-8 text-right">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Leading Platform</h3>
                      <p className="text-slate-600">
                        500+ remote positions placed, 50+ expert columnists, 15 countries covered
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  <div className="flex-1 pl-8">
                    <div className="text-2xl font-bold text-emerald-600">2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-balance animate-fade-in-up">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-200">
              Our columnists and remote assistants work with some of the most innovative companies in the region.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center h-16 animate-fade-in-up">
              <div className="text-2xl font-bold text-slate-400">TechCorp</div>
            </div>
            <div className="flex items-center justify-center h-16 animate-fade-in-up animation-delay-100">
              <div className="text-2xl font-bold text-slate-400">InnovateLab</div>
            </div>
            <div className="flex items-center justify-center h-16 animate-fade-in-up animation-delay-200">
              <div className="text-2xl font-bold text-slate-400">GreenEnergy</div>
            </div>
            <div className="flex items-center justify-center h-16 animate-fade-in-up animation-delay-300">
              <div className="text-2xl font-bold text-slate-400">FinanceHub</div>
            </div>
            <div className="flex items-center justify-center h-16 animate-fade-in-up animation-delay-400">
              <div className="text-2xl font-bold text-slate-400">StartupVentures</div>
            </div>
            <div className="flex items-center justify-center h-16 animate-fade-in-up animation-delay-500">
              <div className="text-2xl font-bold text-slate-400">GlobalTrade</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
