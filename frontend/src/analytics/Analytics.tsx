import { memo, ReactNode } from 'react'
// React Router
import { Routes } from "react-router-dom";
// Googleアナリティクス
import { useTracking } from '../hooks/useTracking';

export const Analytics = memo(({children}: {children: ReactNode}) => {
  useTracking(process.env.REACT_APP_G_TRACKING_ID);
  useTracking(process.env.REACT_APP_UA_TRACKING_ID);

  return (
    <Routes>
      {children}
    </Routes>
  );
});