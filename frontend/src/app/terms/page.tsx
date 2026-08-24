import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/config/seo";
import { EMAIL_ADDRESS, ADDRESS_FULL } from "@/config/constants";

export const metadata: Metadata = constructMetadata({
  title: "Terms & Conditions | Hare Krishna Movement Dehradun",
  description: "Read the Terms & Conditions of Hare Krishna Movement Dehradun. Understand your rights and responsibilities when using our website and services.",
});

const sections = [
  {
    id: 1,
    title: "What Do We Do With Your Information?",
    content: [
      "When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.",
      "When you browse our store, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.",
      "Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.",
    ],
  },
  {
    id: 2,
    title: "Consent",
    content: [
      {
        heading: "How do you get my consent?",
        text: "When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to say no.",
      },
      {
        heading: "How do I withdraw my consent?",
        text: `If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at ${EMAIL_ADDRESS} or mailing us at: ${ADDRESS_FULL}.`,
      },
    ],
  },
  {
    id: 3,
    title: "Disclosure",
    content: [
      "We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.",
    ],
  },
  {
    id: 4,
    title: "Payment",
    content: [
      "We use Easebuzz for processing payments. We/Easebuzz do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.",
      "Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.",
      "PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.",
      "For more insight, you may also want to read the terms and conditions of Easebuzz on http://easebuzz.in/",
    ],
  },
  {
    id: 5,
    title: "Third-Party Services",
    content: [
      "In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.",
      "However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies regarding the information we are required to provide them for your purchase-related transactions.",
      "For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.",
      "In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.",
      "Once you leave our store's website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.",
      {
        heading: "Links",
        text: "When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.",
      },
    ],
  },
  {
    id: 6,
    title: "Security",
    content: [
      "To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.",
    ],
  },
  {
    id: 7,
    title: "Cookies",
    content: [
      "We use cookies to maintain session of your user. It is not used to personally identify you on other websites.",
    ],
  },
  {
    id: 8,
    title: "Age of Consent",
    content: [
      "By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    ],
  },
  {
    id: 9,
    title: "Changes to This Privacy Policy",
    content: [
      "We reserve the right to modify this privacy policy anytime, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.",
      "If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.",
      '"To Communicate with You: We may use your information to respond to your inquiries, provide customer service support, send you important information about the services, and marketing communications (with your consent) via different channels, including but not limited to SMS, Email, RCS, WhatsApp, and Voice."',
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-[#0f4c81] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #eab308 0%, transparent 50%), radial-gradient(circle at 80% 50%, #eab308 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#eab308] font-semibold uppercase tracking-[0.2em] text-sm mb-3">
            Hare Krishna Movement Dehradun
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="w-16 h-1 bg-[#eab308] mx-auto rounded-full" />
          <p className="text-blue-200 mt-5 text-sm">
            Last updated: June 2025
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0f4c81] transition-colors">Home</Link>
          <span className="text-[#eab308]">›</span>
          <span className="text-[#0f4c81] font-semibold">Terms &amp; Conditions</span>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">

        {/* Intro */}
        <div className="bg-blue-50 border-l-4 border-[#0f4c81] rounded-r-xl p-6 mb-10">
          <p className="text-gray-700 leading-relaxed text-[15px]">
            Please read these Terms &amp; Conditions carefully before using the website operated by
            <strong> Hare Krishna Movement Dehradun</strong>. By accessing or using our service,
            you agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-[#f8faff] to-white border-b border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">
                  {section.id}
                </div>
                <h2 className="text-[#0f4c81] font-bold text-lg">
                  Section {section.id} – {section.title}
                </h2>
              </div>

              {/* Section Body */}
              <div className="px-6 py-5 space-y-4">
                {section.content.map((item, idx) =>
                  typeof item === "string" ? (
                    <p key={idx} className="text-gray-600 leading-relaxed text-[15px]">
                      {item}
                    </p>
                  ) : (
                    <div key={idx}>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.heading}</h3>
                      <p className="text-gray-600 leading-relaxed text-[15px]">{item.text}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Box */}
        <div className="mt-12 rounded-2xl bg-[#0f4c81] text-white p-8">
          <h2 className="text-2xl font-bold mb-2">Questions &amp; Contact Information</h2>
          <div className="w-12 h-1 bg-[#eab308] rounded-full mb-5" />
          <p className="text-blue-100 leading-relaxed text-[15px] mb-4">
            If you would like to: access, correct, amend or delete any personal information we have
            about you, register a complaint, or want more information, contact our Privacy Compliance
            Officer:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              📧{" "}
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-[#eab308] hover:underline font-semibold">
                {EMAIL_ADDRESS}
              </a>
            </p>
            <p>📍 {ADDRESS_FULL}</p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#0f4c81] font-semibold hover:gap-3 transition-all text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
