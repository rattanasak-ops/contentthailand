"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Film, FileText } from "lucide-react";

export function CTAIncentive() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #14133D 0%, #702874 50%, #EC1C72 100%)",
      }} />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 30% 50%, rgba(246,165,27,0.15) 0%, transparent 60%)",
      }} />

      {/* Film strip decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 opacity-20" style={{
        background: "repeating-linear-gradient(90deg, #F6A51B 0px, #F6A51B 20px, transparent 20px, transparent 30px)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-2 opacity-20" style={{
        background: "repeating-linear-gradient(90deg, #F6A51B 0px, #F6A51B 20px, transparent 20px, transparent 30px)",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Film className="w-4 h-4 text-[#F6A51B]" />
            <span className="text-white/80 text-sm font-thai">
              {lang === "th" ? "มาตรการส่งเสริมอุตสาหกรรม" : "Industry Incentive Programs"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-thai mb-4 leading-tight">
            {lang === "th" ? (
              <>สมัครมาตรการส่งเสริม<br />การถ่ายทำภาพยนตร์ในประเทศไทย</>
            ) : (
              <>Apply for Thailand<br />Film Incentive Programs</>
            )}
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8 font-thai">
            {lang === "th"
              ? "สิทธิประโยชน์สำหรับผู้ผลิตภาพยนตร์ทั้งชาวไทยและต่างชาติ เพื่อส่งเสริมอุตสาหกรรมภาพยนตร์และวีดิทัศน์"
              : "Benefits for Thai and international film producers to promote the film and video industry"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply/film-incentive"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#F6A51B] text-[#14133D] font-bold font-thai text-lg hover:bg-[#F6A51B]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#F6A51B]/20"
            >
              {lang === "th" ? "สมัครมาตรการถ่ายทำ" : "Apply for Film Incentive"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/apply/digital-content"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-thai text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <FileText className="w-5 h-5" />
              {lang === "th" ? "มาตรการ Digital Content" : "Digital Content Incentive"}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-10 text-white/40 text-xs font-thai">
            <span>{lang === "th" ? "กระทรวงวัฒนธรรม" : "Ministry of Culture"}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{lang === "th" ? "กองภาพยนตร์และวีดิทัศน์" : "Film Division"}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{lang === "th" ? "สำนักงานปลัดกระทรวงวัฒนธรรม" : "Office of the Permanent Secretary"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
