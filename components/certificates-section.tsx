"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { certificates } from "@/data/certificates"
import type { Certificate } from "@/types/portfolio"

export default function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null)

  return (
    <section className="section-pad border-t border-white/[0.04]">
      <div className="container-pro">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Proof</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-50">
            Certificates
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="certificate-swiper"
          >
            {certificates.map((c) => (
              <SwiperSlide key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c)}
                  className="group relative w-full h-56 overflow-hidden rounded-xl border border-white/[0.06] bg-slate-900/50 text-left"
                >
                  <Image
                    src={c.image}
                    alt={c.alt}
                    width={480}
                    height={320}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 line-clamp-2">{c.alt}</p>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl bg-slate-950 border-slate-800">
          <button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
          {selected && (
            <div>
              <Image
                src={selected.image}
                alt={selected.alt}
                width={900}
                height={650}
                className="w-full h-auto object-contain"
              />
              <p className="text-center mt-4 text-sm text-slate-300">{selected.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
