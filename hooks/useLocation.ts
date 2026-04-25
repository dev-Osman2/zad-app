import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("الموقع الجغرافي غير مدعوم في متصفحك");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError("يرجى تفعيل صلاحية الموقع الجغرافي")
    );
  }, []);

  return { coords, error };
};