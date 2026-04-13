'use client'

import Link from "next/link";
import { useState } from "react";
import { API } from "@/services/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await API.post(`/users/contact`, formData);
      setSubmitMessage('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white md:px-10">
      <div className="mx-auto max-w-7xl space-y-16">
        <section className="rounded-4xl border border-white/10 bg-[#0d0d11]/90 p-10 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Get in touch with the StreamForge team.</h1>
          <p className="mt-6 max-w-3xl text-neutral-300 leading-8">
            Have questions about a title, need help with your rental, or want to discuss a custom streaming experience? We&apos;re here to help.
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-4xl border border-white/10 bg-[#0d0d11]/90 p-10 shadow-2xl shadow-black/30 backdrop-blur">
            <h2 className="text-3xl font-semibold">Send us a message</h2>
            <p className="mt-3 text-neutral-400">
              Fill out the form and our support team will respond within one business day.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full rounded-3xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-amber-300"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                className="w-full rounded-3xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-amber-300"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full rounded-3xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-amber-300"
              />
              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your request"
                required
                className="w-full rounded-3xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none focus:border-amber-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-400 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Submit request'}
              </button>
              {submitMessage && (
                <p className={`mt-4 text-sm ${submitMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </section>

          <aside className="space-y-6 rounded-4xl border border-white/10 bg-[#0d0d11]/90 p-10 shadow-2xl shadow-black/30 backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Contact details</p>
              <h2 className="mt-3 text-2xl font-semibold">Need support?</h2>
              <p className="mt-4 text-neutral-400 leading-7">
                Reach our customer care team for subscription help, account questions, or developer partnerships.
              </p>
            </div>
            <div className="space-y-4 text-sm text-neutral-300">
              <div>
                <p className="font-semibold text-white">Email</p>
                <p>ashutoshpal47@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p>+91 98765 43210</p>
              </div>
              <div>
                <p className="font-semibold text-white">Office</p>
                <p>123 Stream Ave, Mumbai, India</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <p className="text-sm uppercase tracking-[0.45em] text-neutral-400">Quick links</p>
              <div className="mt-4 space-y-3 text-sm">
                <Link href="/services" className="block text-amber-300 hover:text-white">Our services</Link>
                <Link href="/" className="block text-amber-300 hover:text-white">Browse movies/Series</Link>
                <Link href="/search" className="block text-amber-300 hover:text-white">Search titles</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
