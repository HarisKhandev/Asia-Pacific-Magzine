import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 text-balance">
              About Physiograph Magazine
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed text-pretty">
              Connecting talent, insights and opportunities across the dynamic
              Asia Pacific region through expert analysis and innovative remote
              work solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-0">
                <Target className="w-12 h-12 text-emerald-600 mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  Our Mission
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To bridge the gap between expertise and emerging talent by
                  creating meaningful remote work opportunities that foster
                  professional growth and knowledge exchange across the Asia
                  Pacific.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-0">
                <Eye className="w-12 h-12 text-emerald-600 mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  Our Vision
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To become the premier platform connecting Asia's brightest
                  minds, fostering innovation and creating a new generation of
                  global-minded professionals ready to tackle tomorrow's
                  challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
              We're more than just a magazine – we're a platform for
              professional growth and opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Expert Content</h3>
                <p className="text-slate-600 leading-relaxed">
                  Publish high-quality insights from experts across politics,
                  economics, foreign policies, defence, technology,
                  sustainability, and business strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Globe className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Remote Opportunities
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Connect talented individuals with remote assistant positions,
                  working directly with our distinguished columnists and content
                  writers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Target className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Professional Growth</h3>
                <p className="text-slate-600 leading-relaxed">
                  Provide mentorship and career development opportunities
                  through direct collaboration with experts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-slate-900">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-slate-600">
              <p className="text-xl leading-relaxed mb-6">
                Founded in 2010, Physiograph emerged from a simple observation:
                the region's most brilliant minds were creating incredible
                insights, but emerging professionals had limited opportunities
                to learn directly from them.
              </p>
              <p className="text-xl leading-relaxed mb-6">
                We saw the potential to create something unique – a platform
                that not only shares expert knowledge through our fortnightly
                publication but also creates meaningful work opportunities for
                the next generation.
              </p>
              <p className="text-xl leading-relaxed">
                Today, we're proud to connect talented individuals with leaders,
                fostering relationships that benefit both mentors and their
                assistance while contributing to the broader Asia Pacific reader
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
