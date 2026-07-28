import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://dettroin-int-dinesh-school-website.vercel.app';
const SITE_NAME = 'Krishna International School';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

/**
 * Dynamic SEO head manager — renders per-route <title>, meta description,
 * Open Graph, and Twitter Card tags via react-helmet-async.
 */
export function SEO({
  title,
  description,
  keywords,
  path = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
}: SEOProps) {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = path === '/' || path === ''
    ? `${SITE_NAME} | Excellence in Education`
    : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph — Facebook, LinkedIn, WhatsApp */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
