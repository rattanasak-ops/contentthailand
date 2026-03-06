"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { FilmStrip } from "@/components/layout/FilmStrip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const breadcrumbs = [
    { label: lang === "th" ? "หน้าหลัก" : "Home", href: "/" },
    { label: lang === "th" ? "ติดต่อเรา" : "Contact" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      lang === "th" ? "ส่งข้อความสำเร็จ" : "Message sent",
      { description: lang === "th" ? "เราจะติดต่อกลับโดยเร็วที่สุด" : "We will get back to you soon" }
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[var(--ct-bg-page)] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6"><Breadcrumb items={breadcrumbs} /></div>

        <div className="mb-10">
          <FilmStrip color="orange" size="lg">
            <h1 className="font-thai font-bold text-2xl md:text-3xl text-[var(--ct-text-primary)]">
              {lang === "th" ? "ติดต่อเรา" : "Contact Us"}
            </h1>
          </FilmStrip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                    {lang === "th" ? "ที่อยู่" : "Address"}
                  </p>
                  <p className="text-[var(--ct-text-muted)] font-body text-sm leading-relaxed">
                    {lang === "th"
                      ? "กองภาพยนตร์และวีดิทัศน์ กรมส่งเสริมวัฒนธรรม\n14 ถนนเทียมร่วมมิตร เขตห้วยขวาง\nกรุงเทพมหานคร 10310"
                      : "Film and Video Division\nDept. of Cultural Promotion\n14 Tiam Ruam Mit Rd, Huai Khwang\nBangkok 10310, Thailand"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-amber flex-shrink-0" />
                <div>
                  <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                    {lang === "th" ? "โทรศัพท์" : "Phone"}
                  </p>
                  <p className="text-[var(--ct-text-muted)] font-body text-sm">02-247-0013</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-orange flex-shrink-0" />
                <div>
                  <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                    {lang === "th" ? "อีเมล" : "Email"}
                  </p>
                  <p className="text-[var(--ct-text-muted)] font-body text-sm">info@contentthailand.com</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-purple-light flex-shrink-0" />
                <div>
                  <p className="text-[var(--ct-text-primary)] font-thai font-semibold text-sm mb-1">
                    {lang === "th" ? "เวลาทำการ" : "Office Hours"}
                  </p>
                  <p className="text-[var(--ct-text-muted)] font-body text-sm">
                    {lang === "th" ? "จันทร์ - ศุกร์ 08:30 - 16:30 น." : "Mon-Fri 08:30-16:30"}
                  </p>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[var(--ct-border)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5!2d100.5731!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzIyLjciTiAxMDDCsDM0JzIzLjIiRQ!5e0!3m2!1sth!2sth!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={lang === "th" ? "แผนที่กองภาพยนตร์และวีดิทัศน์" : "Map"}
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-[var(--ct-bg-elevated)] rounded-xl border border-[var(--ct-border)] p-6">
            <h2 className="font-thai font-bold text-[var(--ct-text-primary)] text-lg mb-6">
              {lang === "th" ? "ส่งข้อความถึงเรา" : "Send us a message"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[var(--ct-text-muted)] text-xs font-thai block mb-1.5">
                  {lang === "th" ? "ชื่อ-นามสกุล" : "Full Name"}
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[var(--ct-bg-page)] border-[var(--ct-border)] text-[var(--ct-text-primary)] font-thai"
                />
              </div>
              <div>
                <label className="text-[var(--ct-text-muted)] text-xs font-thai block mb-1.5">
                  {lang === "th" ? "อีเมล" : "Email"}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[var(--ct-bg-page)] border-[var(--ct-border)] text-[var(--ct-text-primary)] font-body"
                />
              </div>
              <div>
                <label className="text-[var(--ct-text-muted)] text-xs font-thai block mb-1.5">
                  {lang === "th" ? "ข้อความ" : "Message"}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full rounded-md bg-[var(--ct-bg-page)] border border-[var(--ct-border)] text-[var(--ct-text-primary)] font-body px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber/50"
                />
              </div>
              <Button type="submit" className="w-full bg-amber hover:bg-amber/80 text-midnight font-thai font-semibold">
                <Send className="w-4 h-4 mr-2" />
                {lang === "th" ? "ส่งข้อความ" : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
