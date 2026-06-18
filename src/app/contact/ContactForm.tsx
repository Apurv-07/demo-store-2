"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMsg("Please enter your email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Please enter a valid email address");
      return false;
    }
    if (!formData.subject.trim()) {
      setErrorMsg("Please enter a subject");
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please enter your message");
      return false;
    }
    if (formData.message.length < 10) {
      setErrorMsg("Message must be at least 10 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1000);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
        <p className="text-sm text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3">
          <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-emerald-900">Message Sent Successfully!</p>
            <p className="text-xs text-emerald-700 mt-1">Thank you for contacting us. We'll be in touch soon.</p>
          </div>
        </div>
      )}

      {status === "error" && errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3">
          <AlertCircle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-rose-900">Validation Error</p>
            <p className="text-xs text-rose-700 mt-1">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm disabled:bg-gray-50"
              disabled={status === "loading"}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm disabled:bg-gray-50"
              disabled={status === "loading"}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm disabled:bg-gray-50"
            disabled={status === "loading"}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows={6}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm resize-none disabled:bg-gray-50"
            disabled={status === "loading"}
          />
          <p className="text-xs text-gray-500">{formData.message.length} characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
          {status !== "loading" && <Send size={16} />}
        </button>
      </form>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. We'll never share your information with third parties.
      </p>
    </div>
  );
}
