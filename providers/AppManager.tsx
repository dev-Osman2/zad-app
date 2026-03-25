"use client";
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { App as CapacitorApp } from '@capacitor/app';

export default function AppManager() {
  const router = useRouter();
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  // 1. استرجاع وحفظ آخر صفحة كان بها المستخدم
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const lastRoute = localStorage.getItem('last_saved_route');
      
      // إذا كان هناك مسار محفوظ والتطبيق يفتح للتو على الصفحة الرئيسية، اذهب للمسار المحفوظ
      if (lastRoute && lastRoute !== '/' && pathname === '/') {
        router.replace(lastRoute);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    // حفظ المسار الحالي كلما تنقل المستخدم
    if (pathname) {
      localStorage.setItem('last_saved_route', pathname);
    }
  }, [pathname]);

  // 2. التحكم في زر الرجوع الفعلي للهاتف
  useEffect(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        router.back();
      } else {
        CapacitorApp.exitApp(); // إغلاق التطبيق إذا كنا في الصفحة الرئيسية
      }
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [router]);

  return null; // هذا المكون يعمل في الخلفية ولا يظهر شيئاً
}