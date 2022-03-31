import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (
      key: string,
      trackingId: string,
      config: { page_path: string }
    ) => void;
  }
}

export const useTracking = (
  trackingId: string | undefined = process.env.REACT_APP_G_TRACKING_ID
) => {
  let location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;
    if (!trackingId) return;
    window.gtag("config", trackingId, { page_path: location.pathname });
  }, [trackingId, location]);
};