import { profile } from "@/data/profile"
import { projects } from "@/data/projects"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function JsonLd() {
  const featured = projects.filter((p) => p.featured).slice(0, 4)

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.summary,
        email: profile.email,
        telephone: profile.phone,
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        sameAs: [profile.socials.github, profile.socials.linkedin],
        knowsAbout: [
          "Machine Learning",
          "Generative AI",
          "Retrieval-Augmented Generation",
          "Python",
          "FastAPI",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.name} Portfolio`,
        author: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ItemList",
        name: "Featured Projects",
        itemListElement: featured.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.description,
            ...(p.demo ? { url: p.demo } : {}),
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
