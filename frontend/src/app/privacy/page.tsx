import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/config/seo";
import { EMAIL_ADDRESS, ADDRESS_FULL } from "@/config/constants";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Hare Krishna Movement Dehradun",
  description: "Read the Privacy Policy of Hare Krishna Movement Dehradun. Learn how we collect, use, and protect your personal information.",
});

const sections = [
  {
    id: "1",
    title: "Information Collected by Hare Krishna Movement, Dehradun",
    intro:
      "We will not knowingly use information collected on this website to others in ways different from what is disclosed in this statement. Hare Krishna Movement, Dehradun collects information from our users at several different points on our website.\n\nFor purposes of this Privacy Statement, 'Personally Identifiable Information' refers to information that can directly identify an individual; for example, such information may include an individual's name, mailing address, phone number or email address.",
    subsections: [
      {
        id: "1.1",
        title: "Information that Is Automatically Collected",
        text: "We use IP addresses, with the help of a business partner, to analyze trends, administer the website, track users' movements, and gather broad demographic information for aggregate use. IP addresses are not linked to Personally Identifiable Information.",
      },
      {
        id: "1.2",
        title: "Information that Is Collected by Cookies",
        text: "A cookie is a piece of data stored on a user's hard drive containing information about that user. By setting a cookie on our website, the user would not have to log in with a password more than once, thereby saving time while on our website. If a user rejects the cookie, they may still use our website. The only drawback to this is that the user will be limited in some areas of our website. Cookies can also enable us to track and target the interests of our users to enhance the experience on our website.",
      },
      {
        id: "1.3",
        title: "Information that Is Actively Submitted to Hare Krishna Movement, Dehradun",
        text: "Registrations and Orders: In order to donate online or order services from this website, a user must create an account and complete a registration process. During the account creation process, a user must provide contact information (such as name and email address) so that we can stay in touch with our users. This information is also used to fulfill order and registration requests.\n\nTo donate online or for other service ordered, a user must provide contact information (such as name and shipping address) and financial information (such as a credit card number and its expiration date). This information is used for billing purposes, with the help of our service provider (the bank which is providing us the payment gateway facilities), and to fill users' orders. If we have trouble processing an order, this contact information is used to get in touch with the user.\n\nTell-A-Friend: If a user elects to use our referral service for informing a friend about our website, we ask them for the friend's name and email address. We will automatically send the friend a one-time email inviting them to visit the website. We store this information for the purpose of sending this one-time email. The friend may contact us at http://www.hkmdehradun.org to request the removal of this information from this database.",
      },
      {
        id: "1.4",
        title: "Third Party Advertisers on Hare Krishna Movement, Dehradun's Website",
        text: "Presently, we do not provide any third party advertisement on our website. No third party interference is yet allowed and hence there is no question of collecting any information from third party from our website. In future, if we allow advertisement on this website with authorized permission, we will decide on the collection of private information by third party or use of cookies by third party. The necessary information will be mentioned in this place.",
      },
      {
        id: "1.5",
        title: "Information Hare Krishna Movement, Dehradun Obtains from Third Parties",
        text: "Presently website is not collecting user information from third party. Only in case of Payment Gateway, the bank collects very critical information like Credit card or debit card number, Expiry date, Card holder's name, amount deducted and any other relevant information which is must for online transaction. These information are collected by payment gateway service provider and stored with them. Hare Krishna Movement Dehradun stores only your contact information and amount you donate or pay for various services or products.\n\nThe critical information like credit or debit card number, its expiry date, card holder's name, bank name are not at all stored with Hare Krishna Movement Dehradun website — it is stored with the payment gateway service providers. The payment gateway service provider sends the transaction number to Hare Krishna Movement Dehradun website on completion of payment procedure along with status of transaction (success, cancel or error).\n\na. On Successful transaction of payment: In case of successful transaction, the user will be informed accordingly via email. The amount will be credited in the account of Hare Krishna Movement, Dehradun. If payment is for donation, the user will get an income tax exemption certificate (in India only).\n\nb. On Cancel of transaction of payment: If user cancels the transaction in middle of the process, the details are stored in the database. In case of cancellation, it is possible that server might have already completed the transaction. If the transaction is for donation, cancellation is not possible. For services or purchase of products, users can cancel via their account if the order has not been processed.\n\n\"We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.\"",
      },
    ],
  },
  {
    id: "2",
    title: "Communications from Hare Krishna Movement, Dehradun",
    intro: "",
    subsections: [
      {
        id: "",
        title: "Welcome Emails and General Correspondence",
        text: "We send a welcoming email to verify the user's password and username. This process is designed to prevent e-mail addresses from being used without permission. Established users will occasionally receive information on products, services, special deals, and a newsletter.",
      },
      {
        id: "",
        title: "Site and Service Updates",
        text: "We send the user website and service announcement updates. Users are not permitted to unsubscribe from service announcements, which contain important information about the website and/or service.",
      },
      {
        id: "",
        title: "Surveys & Contests",
        text: "From time-to-time our website requests information from users via surveys or contests. Participation in these surveys or contests is completely voluntary and the user has a choice whether or not to disclose this information.",
      },
    ],
  },
  {
    id: "3",
    title: "How Information Collected by Hare Krishna Movement, Dehradun Is Used",
    intro: "",
    subsections: [
      {
        id: "",
        title: "Demographic Information",
        text: "We will share aggregated demographic information with our partners. The aggregated demographic information is not linked to any Personally Identifiable Information that can identify any individual person.",
      },
      {
        id: "",
        title: "Communicating with Our Users",
        text: "We use Personally Identifiable Information (such as your name, telephone number or email address) to communicate with our users when they have questions, concerns or comments about their accounts or the services that we provide.",
      },
      {
        id: "",
        title: "Information Shared With Third Parties",
        text: "We do not share your information with third party except you provide while payment transaction to payment gateway service providers. We use a credit card processing company to bill users for goods and services. We may also provide information to respond to subpoenas, court orders, or legal process, or to establish or exercise our legal rights or defend against legal claims.",
      },
    ],
  },
  {
    id: "4",
    title: "Correction/Updating Personal Information",
    intro:
      "Users must provide accurate and correct contact information (name, postal address, e-mail address, phone number). On providing wrong information if we are unable to process your request, we are not responsible for the act. Due to wrong information a product may not reach your destination in time, or sometimes not reach at all. In that case, Hare Krishna Movement Dehradun is not responsible and has no legal obligation to provide required services or refund your amount.",
    subsections: [],
  },
  {
    id: "5",
    title: "Opting Out",
    intro:
      `Users are provided an opportunity to "opt-out" of having their information used for purposes not directly related to the services they request. Users who no longer wish to receive our newsletter or promotional materials may opt-out by replying and typing "unsubscribe" in the subject line or emailing your request to ${EMAIL_ADDRESS}.`,
    subsections: [],
  },
  {
    id: "6",
    title: "Use of the Website by Persons Under Age 18",
    intro:
      `This website is not intended for use by anyone under the age of eighteen (18), and any individual under such age should not provide us with Personally Identifiable Information. We do not knowingly contact, market to, solicit, collect or use Personally Identifiable Information from or about any individual under the age of 18. If you want to notify us of our receipt of information by children under 18, please email us at ${EMAIL_ADDRESS}.`,
    subsections: [],
  },
  {
    id: "7",
    title: "Linking to Third Party Websites",
    intro:
      "This website contains links to other websites. Please be aware that we are not responsible for the privacy practices of such other websites. We encourage our users to be aware when they leave our website and to read the Privacy Statements of each and every website that collects Personally Identifiable Information.",
    subsections: [],
  },
  {
    id: "8",
    title: "Users Must Keep Their Passwords Private",
    intro:
      "Users are required to keep their account passwords confidential and do not share this information with others. If you choose to reveal or share your password and Hare Krishna Movement, Dehradun account name, we are unable to guarantee the security of your account.",
    subsections: [],
  },
  {
    id: "9",
    title: "Changes to Our Privacy Statement",
    intro:
      "This Privacy Statement may change, and use of information that we gather now is subject to the Privacy Statement that is in effect as of the time of use. You are responsible for periodically checking our Privacy Statement. If we make material changes to this Privacy Statement, we will prominently post a notification on our website ten (10) days prior to implementing the change.",
    subsections: [],
  },
  {
    id: "10",
    title: "Final Statement",
    intro:
      `Hare Krishna Movement, Dehradun will use your information in accordance with the Privacy Statement that is currently in effect. If you have any questions about the security at our website, you can send an email to ${EMAIL_ADDRESS}.`,
    subsections: [],
  },
];

const tableOfContents = [
  "Information Collected by Hare Krishna Movement, Dehradun",
  "Communications from Hare Krishna Movement, Dehradun",
  "How Information Collected by Hare Krishna Movement, Dehradun is used",
  "Correction/Updating Personal Information",
  "Opting Out",
  "Use of the Website by Persons Under Age 18",
  "Linking to Third Party Websites",
  "Users Must Keep Their Passwords Private",
  "Changes to Our Privacy Statement",
  "Final Statement",
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <div className="w-16 h-1 bg-[#eab308] mx-auto rounded-full" />
          <p className="text-blue-200 mt-5 text-sm">Last updated: June 2025</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0f4c81] transition-colors">
            Home
          </Link>
          <span className="text-[#eab308]">›</span>
          <span className="text-[#0f4c81] font-semibold">Privacy Policy</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        {/* Intro Statement */}
        <div className="bg-blue-50 border-l-4 border-[#0f4c81] rounded-r-xl p-6 mb-8">
          <h2 className="text-[#0f4c81] font-bold text-xl mb-3">Privacy Statement</h2>
          <p className="text-gray-700 leading-relaxed text-[15px] mb-4">
            This Privacy Statement discloses the privacy practices for{" "}
            <strong>Hare Krishna Movement, Dehradun</strong> ("Hare Krishna Movement Dehradun",
            "We" or "Us") and how it treats the information that Hare Krishna Movement Dehradun
            collects and receives, including information related to your past use of Hare Krishna
            Movement Dehradun donations, products and services. This policy does not apply to the
            practices of companies that Hare Krishna Movement, Dehradun does not own or control or
            to people that Hare Krishna Movement, Dehradun does not employ or manage.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <h2 className="text-[#0f4c81] font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#eab308] flex items-center justify-center text-white text-xs font-bold">≡</span>
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {tableOfContents.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[15px]">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0f4c81] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-[#f8faff] to-white border-b border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0f4c81] text-white flex items-center justify-center font-bold text-sm">
                  {section.id}
                </div>
                <h2 className="text-[#0f4c81] font-bold text-lg">{section.title}</h2>
              </div>

              {/* Section Body */}
              <div className="px-6 py-5 space-y-5">
                {section.intro && (
                  <div className="space-y-3">
                    {section.intro.split("\n\n").map((para, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed text-[15px]">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {section.subsections.length > 0 && (
                  <div className="space-y-5">
                    {section.subsections.map((sub, idx) => (
                      <div
                        key={idx}
                        className="pl-4 border-l-2 border-[#eab308]"
                      >
                        <h3 className="font-semibold text-gray-800 mb-2 text-[15px]">
                          {sub.id && (
                            <span className="text-[#0f4c81] mr-1">{sub.id}.</span>
                          )}
                          {sub.title}
                        </h3>
                        {sub.text.split("\n\n").map((para, i) => (
                          <p
                            key={i}
                            className="text-gray-600 leading-relaxed text-[15px] mb-2"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
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
            If you would like to access, correct, amend or delete any personal information we have
            about you, register a complaint, or simply want more information, contact our Privacy
            Compliance Officer:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              📧{" "}
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="text-[#eab308] hover:underline font-semibold"
              >
                {EMAIL_ADDRESS}
              </a>
            </p>
            <p>📍 {ADDRESS_FULL}</p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#0f4c81] transition-colors">
            ← Back to Home
          </Link>
          <span className="text-[#eab308]">|</span>
          <Link href="/terms" className="hover:text-[#0f4c81] transition-colors">
            Terms &amp; Conditions
          </Link>
          <span className="text-[#eab308]">|</span>
          <Link href="/refund-policy" className="hover:text-[#0f4c81] transition-colors">
            Refund Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
