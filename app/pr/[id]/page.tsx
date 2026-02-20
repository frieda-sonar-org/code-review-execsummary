import PRDetailClient from './PRDetailClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  // Generate paths for PR IDs 1-50 for static export
  return Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function PRDetailPage() {
  return <PRDetailClient />;
}
