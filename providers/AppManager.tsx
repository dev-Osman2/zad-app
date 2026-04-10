"use client";
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useTheme } from '@/providers/ThemeProvider';

export default function AppManager() {
  const router = useRouter();
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const { darkMode } = useTheme();

  
  useEffect(() => {
    const updateStatusBar = async () => {
      try {
        
        await StatusBar.setOverlaysWebView({ overlay: false });
        
        if (darkMode ) {
          
          await StatusBar.setBackgroundColor({ color: '#0f172a' });
          await StatusBar.setStyle({ style: Style.Dark });
        } else {
          
          await StatusBar.setBackgroundColor({ color: '#fdfbf7' });
          await StatusBar.setStyle({ style: Style.Light });
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        
      }
    };

    updateStatusBar();
  }, [darkMode]);

  
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const lastRoute = localStorage.getItem('last_saved_route');
      if (lastRoute && lastRoute !== '/' && pathname === '/') {
        router.replace(lastRoute);
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    if (pathname) {
      localStorage.setItem('last_saved_route', pathname);
    }
  }, [pathname]);

  
  useEffect(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        router.back();
      } else {
        CapacitorApp.exitApp();
      }
    });
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [router]);

  return null;
}