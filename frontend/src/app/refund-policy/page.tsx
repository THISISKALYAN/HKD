import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Hare Krishna Movement Dehradun",
  description:
    "Read the Refund & Cancellation Policy of Hare Krishna Movement Dehradun at www.hkmdehradun.org.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-[#0f4c81] py-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #eab308 0%, transparent 50%), radial-gradient(circle at 80% 50%, #eab308 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#eab308] font-semibold uppercase tracking-[0.2em] text-sm mb-3">
            Hare Krishna Movement Dehradun
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <div className="w-16 h-1 bg-[#eab308] mx-auto rounded-full" />
          <p className="text-blue-200 mt-5 text-sm">
            Applicable for www.hkmdehradun.org
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0f4c81] transition-colors">
            Home
          </Link>
          <span className="text-[#eab308]">›</span>
          <span className="text-[#0f4c81] font-semibold">Refund &amp; Cancellation Policy</span>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">

        {/* Important Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="flex-shrink-0 text-3xl">🙏</div>
          <div>
            <h2 className="font-bold text-amber-800 text-lg mb-1">Please Read Carefully</h2>
            <p className="text-amber-700 text-[15px] leading-relaxed">
              All donations and payments made to Hare Krishna Movement Dehradun are made voluntarily
              and in a spirit of devotion. Please review this policy before completing any
              transaction.
            </p>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="space-y-6">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-[#f8faff] to-white border-b border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="text-[#0f4c81] font-bold text-lg">
                No Cancellation of Payments / Donations
              </h2>
            </div>
            <div className="px-6 py-6">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Any request for cancellations of payments/donations once duly placed shall{" "}
                <strong className="text-gray-800">not be entertained.</strong>
              </p>
              <div className="mt-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                <p className="text-red-700 text-sm font-medium">
                  ⚠️ Once a donation or payment is made, it cannot be cancelled or refunded under
                  any circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-[#f8faff] to-white border-b border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h2 className="text-[#0f4c81] font-bold text-lg">
                Responsibility for Incorrect Details
              </h2>
            </div>
            <div className="px-6 py-6">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                In the event that a non-delivery occurs on account of a mistake by you (i.e. wrong
                name or address), any extra cost incurred by the Temple for redelivery shall be
                claimed from the User placing the order.
              </p>
              <div className="mt-4 bg-blue-50 border-l-4 border-[#0f4c81] rounded-r-xl p-4">
                <p className="text-[#0f4c81] text-sm font-medium">
                  💡 Please ensure all details (name, address, contact number) are entered correctly
                  before confirming your transaction.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Summary Box */}
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#0f4c81] to-[#1a6eb5] text-white p-8">
          <h2 className="text-2xl font-bold mb-2">Summary</h2>
          <div className="w-12 h-1 bg-[#eab308] rounded-full mb-6" />
          <ul className="space-y-3 text-blue-100 text-[15px]">
            <li className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#eab308] flex items-center justify-center text-white text-xs font-bold">✓</span>
              <span>All payments and donations are <strong className="text-white">final and non-refundable</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#eab308] flex items-center justify-center text-white text-xs font-bold">✓</span>
              <span>Cancellation requests will <strong className="text-white">not be accepted</strong> once a payment is made.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#eab308] flex items-center justify-center text-white text-xs font-bold">✓</span>
              <span>Users are responsible for providing <strong className="text-white">accurate delivery information</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#eab308] flex items-center justify-center text-white text-xs font-bold">✓</span>
              <span>Re-delivery costs due to incorrect details will be <strong className="text-white">borne by the user</strong>.</span>
            </li>
          </ul>
        </div>

        {/* Contact Box */}
        <div className="mt-8 rounded-2xl border-2 border-[#0f4c81] p-8 text-center">
          <div className="text-4xl mb-3">🙏</div>
          <h2 className="text-[#0f4c81] font-bold text-xl mb-2">Have Questions?</h2>
          <p className="text-gray-600 text-[15px] mb-4 leading-relaxed">
            If you have any questions regarding our refund and cancellation policy, please reach out
            to us. We are happy to assist you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="mailto:contact@hkmdehradun.org"
              className="inline-flex items-center gap-2 bg-[#0f4c81] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a6eb5] transition-colors"
            >
              📧 contact@hkmdehradun.org
            </a>
            <a
              href="tel:+918296875074"
              className="inline-flex items-center gap-2 border-2 border-[#0f4c81] text-[#0f4c81] px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              📞 +91 82968 75074
            </a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#0f4c81] transition-colors">
            ← Back to Home
          </Link>
          <span className="text-[#eab308]">|</span>
          <Link href="/privacy" className="hover:text-[#0f4c81] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-[#eab308]">|</span>
          <Link href="/terms" className="hover:text-[#0f4c81] transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </main>
  );
}
