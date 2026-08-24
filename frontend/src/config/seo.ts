import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export const defaultSEO = {
  title: 'Hare Krishna Dharma Trust - Gau Seva & Annadana Seva',
  description: 'Offer Gau Seva, Annadana Seva, and Prasadam online at Sri Radha Krishna Dham, Vrindavan. Fast secure donations with automated 80G receipts and WhatsApp updates.',
  image: '/og-image.webp',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hkmdehradun.org',
};

export function constructMetadata({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  noIndex = false,
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(defaultSEO.siteUrl),
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
