import React from "react";
import Link from "next/link";
import { ArrowRight, Heart, Target, Zap, Users, Award, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Curated Essentials",
  description: "Learn about our mission, values, and commitment to exceptional products and customer service.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">About Curated Essentials</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We're on a mission to make premium products accessible to everyone. Since day one, we've been committed to
            quality, transparency, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-8 space-y-16">
        {/* Our Story */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="w-12 h-1 bg-gray-900 rounded-full" />
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Curated Essentials was founded with a simple belief: everyone deserves access to high-quality products
              without compromise. What started as a small passion project has grown into a thriving marketplace serving
              customers worldwide.
            </p>
            <p>
              Our curated collection spans beauty, fragrances, electronics, furniture, and more. Each product is
              carefully selected to ensure it meets our rigorous standards for quality, durability, and value.
            </p>
            <p>
              Today, we're proud to serve thousands of satisfied customers who trust us with their shopping needs and
              rely on our expert curation and exceptional service.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-4">
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg w-fit">
              <Target size={24} className="text-gray-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To provide an exceptional shopping experience by curating premium products and delivering outstanding
                service to every customer.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-4">
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg w-fit">
              <Zap size={24} className="text-gray-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To become the world's most trusted platform for discovering and purchasing carefully curated products
                that inspire and delight.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-4">
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg w-fit">
              <Heart size={24} className="text-gray-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Our Values</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Quality, integrity, customer-centricity, and innovation guide everything we do. We believe in
                transparency and building lasting relationships with our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <div className="w-12 h-1 bg-gray-900 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Award,
                title: "Quality First",
                desc: "Every product is rigorously tested to ensure it meets our high standards.",
              },
              {
                icon: Users,
                title: "Customer Centric",
                desc: "Your satisfaction is our priority. We listen, adapt, and continuously improve.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "We source from the world's best brands and deliver to customers worldwide.",
              },
              {
                icon: Zap,
                title: "Innovation",
                desc: "We embrace new technologies and ideas to enhance your shopping experience.",
              },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 space-y-3">
                  <div className="p-2 bg-gray-50 border border-gray-100 rounded-lg w-fit">
                    <Icon size={20} className="text-gray-900" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{value.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Why Customers Choose Us</h2>
            <div className="w-12 h-1 bg-gray-900 rounded-full" />
          </div>

          <ul className="space-y-4">
            {[
              "Expertly curated products from top brands worldwide",
              "Competitive pricing with frequent discounts and promotions",
              "Fast, reliable shipping with free delivery on orders over $150",
              "Hassle-free 30-day returns and exchanges",
              "Responsive customer support available 24/7",
              "Secure checkout with multiple payment options",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start space-x-4">
                <div className="p-1 bg-emerald-100 rounded-full flex-shrink-0 mt-1">
                  <ArrowRight size={16} className="text-emerald-600" />
                </div>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <div className="w-12 h-1 bg-gray-900 rounded-full" />
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            Our passionate team of curators, designers, and customer service experts work tirelessly to bring you the best
            shopping experience possible.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO", initials: "SJ" },
              { name: "Marcus Chen", role: "Head of Curation", initials: "MC" },
              { name: "Emily Rodriguez", role: "VP of Operations", initials: "ER" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg">
                  {member.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white rounded-2xl p-12 text-center space-y-6">
          <h3 className="text-3xl font-bold">Ready to Experience the Difference?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Browse our carefully curated collection and discover products that elevate your lifestyle.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span>Shop Now</span>
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </div>
  );
}
