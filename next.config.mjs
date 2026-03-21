/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig = {
  output: 'export', // 👈 السطر الأهم: يخبر Next.js باستخراج الموقع كملفات ثابتة (HTML/CSS/JS)
  turbopack: {},
  images: {
    unoptimized: true, // 👈 السطر الثاني الأهم: يوقف سيرفر تحسين الصور لأن تطبيق الموبايل لا يحتوي على سيرفر
    formats: ['image/avif', 'image/webp'],
  },
};

export default withPWA(nextConfig);