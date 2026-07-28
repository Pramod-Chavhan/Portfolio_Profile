"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { certificates } from "@/data/certificates"
import type { Certificate } from "@/types/portfolio"
import EnhancedSectionHeading from "@/components/enhanced-section-heading"

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  return (
    <div className="container mx-auto px-4">
      <EnhancedSectionHeading subtitle="Credentials" title="Certificates" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="certificate-swiper"
        >
          {certificates.map((certificate) => (
            <SwiperSlide key={certificate.id}>
              <div
                className="cursor-pointer group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20 h-64"
                onClick={() => setSelectedCertificate(certificate)}
              >
                <Image
                  src={certificate.image || "/placeholder.svg"}
                  alt={certificate.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-medium px-4 py-2 rounded-full bg-teal-600/80 backdrop-blur-sm">
                    View Certificate
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-3xl bg-slate-950 border-slate-800">
          <button
            onClick={() => setSelectedCertificate(null)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          {selectedCertificate && (
            <div className="p-0">
              <Image
                src={selectedCertificate.image || "/placeholder.svg"}
                alt={selectedCertificate.alt}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
              <p className="text-center mt-4 text-lg font-medium">{selectedCertificate.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
