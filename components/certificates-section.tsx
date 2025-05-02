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

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  const certificates = [
    { id: 1, image: "/cer1.PNG?height=300&width=400", alt: "Certificate 1" },
    { id: 2, image: "/cer2.PNG?height=300&width=400", alt: "Google DA Certificate" },
    { id: 3, image: "/cer3.PNG?height=300&width=400", alt: "Certificate 3" },
    { id: 4, image: "/cer4.PNG?height=300&width=400", alt: "Certificate 4" },
    { id: 5, image: "/cer5.jpeg?height=300&width=400", alt: "Certificate 5" },
    { id: 6, image: "/cer6.jpg?height=300&width=400", alt: "Certificate 6" },
    { id: 7, image: "/cer7.jpg?height=300&width=400", alt: "Certificate 7" },
    { id: 8, image: "/cer8.jpg?height=300&width=400", alt: "Certificate 8" },
    { id: 9, image: "/cer9.jpg?height=300&width=400", alt: "Certificate 9" },
    { id: 10, image: "/cer10.PNG?height=300&width=400", alt: "Certificate 10" },
    { id: 11, image: "/cer11.PNG?height=300&width=400", alt: "GL for pyML" },
    { id: 12, image: "/cer12.PNG?height=300&width=400", alt: "Hackerrank Python" },
    { id: 13, image: "/cer13.jpg?height=300&width=400", alt: "Hackerrank Python" },
    { id: 14, image: "/cer14.jpg?height=300&width=400", alt: "Hackerrank Python" },
    { id: 15, image: "/cer15.jpg?height=300&width=400", alt: "Hackerrank Python" },
    { id: 16, image: "/cer16.jpg?height=300&width=400", alt: "Hackerrank Python" },
    
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-lg text-purple-400 mb-2">My Achievements</p>
        <h2 className="text-4xl font-bold mb-4">Certificates</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </motion.div>

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
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="certificate-swiper"
        >
          {certificates.map((certificate) => (
            <SwiperSlide key={certificate.id}>
              <div
                className="cursor-pointer group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 h-64"
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
                  <p className="text-white font-medium px-4 py-2 rounded-full bg-purple-600/80 backdrop-blur-sm">
                    View Certificate
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800">
          <button
            onClick={() => setSelectedCertificate(null)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
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
