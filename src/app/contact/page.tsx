import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";
import { ContactFormClient } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Curated Essentials",
  description: "Get in touch with our support team. We're here to help with any questions or concerns.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Get in Touch</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to our support team and we'll get back to you
            as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg w-fit">
                <Mail size={24} className="text-gray-900" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                <a href="mailto:support@curatedessentials.com" className="text-sm text-gray-600 hover:text-gray-900 break-all">
                  support@curatedessentials.com
                </a>
                <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg w-fit">
                <Phone size={24} className="text-gray-900" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Phone Support</h3>
                <a href="tel:+1-800-123-4567" className="text-sm text-gray-600 hover:text-gray-900">
                  +1 (800) 123-4567
                </a>
                <p className="text-xs text-gray-500 mt-2">Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg w-fit">
                <MapPin size={24} className="text-gray-900" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Office Location</h3>
                <p className="text-sm text-gray-600">
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactFormClient />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white border-t border-gray-100 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What's your return policy?",
                a: "We offer a hassle-free 30-day return policy on most items. Simply initiate a return through your account.",
              },
              {
                q: "How long does shipping take?",
                a: "Standard shipping takes 5-7 business days. Express shipping is available for urgent orders.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 150 countries worldwide. Shipping costs and times vary by location.",
              },
              {
                q: "How secure is my payment?",
                a: "We use industry-leading encryption and security measures to protect your financial information.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-6 space-y-2">
                <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
