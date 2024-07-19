import { HOST } from "@/config/constants"

export interface MetadataSeoProps {
  title: string
  description: string
}

export function MetadataSeo({ title, description }: MetadataSeoProps) {
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      siteName: title,
      locale: "en_US",
      images: [
        {
          url: HOST + "/img/thumbnail.jpg",
          alt: description
        }
      ]
    }
  }
}
