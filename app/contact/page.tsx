"use client";
import { useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Clock, Video, CheckCircle, Phone } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNav />

      <section className="bg-white py-16 px-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-500">Have a question before booking? We respond within 24 hours.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact form */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                    <p className="text-gray-500">We&apos;ll get back to you within 24 hours at <strong>{form.email}</strong>.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            placeholder="Full name"
                            value={form.name}
                            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
                        >
                          <option value="">Select a topic...</option>
                          <option>Question about booking</option>
                          <option>Question about pricing</option>
                          <option>Question about subjects</option>
                          <option>Group class inquiry</option>
                          <option>Technical issue</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          rows={5}
                          placeholder="Tell us what you need help with..."
                          value={form.message}
                          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white resize-none"
                        />
                      </div>
                      <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={!form.name || !form.email || !form.message || loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact info */}
          <div className="space-y-5">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-violet-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Phone</p>
                      <a href="tel:2272206227" className="text-sm text-gray-500 hover:text-violet-600">(227) 220-6227</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-violet-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email</p>
                      <a href="mailto:MsHoraceTutoring06@gmail.com" className="text-sm text-gray-500 hover:text-violet-600">MsHoraceTutoring06@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-violet-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Response Time</p>
                      <p className="text-sm text-gray-500">Within 24 hours, usually same day</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-violet-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Sessions</p>
                      <p className="text-sm text-gray-500">All sessions are conducted via Zoom</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-violet-50 border-violet-200">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-gray-900 mb-2">Ready to Book?</h3>
                <p className="text-sm text-gray-500 mb-4">Skip the wait and book your first session online right now.</p>
                <a href="/book" className="block">
                  <Button className="w-full">Book a Session</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
