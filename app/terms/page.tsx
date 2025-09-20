import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 text-balance">
              Terms & Conditions
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-white rounded-lg shadow-sm border p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  By using Physiograph website and services, you accept and
                  agree to be bound by the terms and provision of this
                  agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  2. Application Process
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When applying for remote assistant positions through our
                  platform:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>
                    All information provided must be accurate and truthful.
                  </li>
                  <li>
                    You must be legally eligible to work remotely in your
                    jurisdiction.
                  </li>
                  <li>
                    CV and supporting documents become part of our recruitment.
                    database
                  </li>
                  <li>
                    We reserve the right to verify all information provided.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  3. Employment Terms
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Remote assistant positions offered through our platform:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>
                    Are independent contract arrangements unless specified
                  </li>
                  <li>Require adherence to confidentiality agreements</li>
                  <li>May involve flexible or fixed working hours as agreed</li>
                  <li>Include performance expectations and review processes</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  All content published in Physiograph, including articles,
                  images and multimedia content remains the intellectual
                  property of the respective authors and Physiograph.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  5. Privacy and Data Protection
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We are committed to protecting your privacy:
                </p>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li>
                    Personal information is collected only for legitimate
                    purposes
                  </li>
                  <li>
                    Data is stored securely and not shared with unauthorized
                    third parties
                  </li>
                  <li>We comply with applicable data protection regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Physiograph shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from
                  your use of our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  7. Termination
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We may terminate or suspend access to our service immediately,
                  without prior notice or liability if you breach the Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  8. Changes to Terms
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any
                  time. If a revision is material, we will try to provide notice
                  prior to any new terms taking effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  9. Contact Information
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions about these Terms & Conditions,
                  please contact us at:
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                  <p className="text-slate-700">
                    <strong>Email:</strong> legal@apmagazine.com
                    {/* <br /> */}
                    {/* <strong>Phone:</strong> +1 (555) 123-4567 */}
                    {/* <br /> */}
                    {/* <strong>Address:</strong> Asia Pacific Magazine, 123
                    Business District, Singapore 018956 */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
