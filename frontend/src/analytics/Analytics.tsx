import { memo, ReactNode } from 'react'
// React Router
import { Routes } from "react-router-dom";
// Googleアナリティクス
import { useTracking } from '../hooks/useTracking';

export const Analytics = memo(({children}: {children: ReactNode}) => {
  useTracking(process.env.G_TRACKING_Id);
  useTracking(process.env.UA_TRACKING_Id);

  return (
    <Routes>
      {children}
    </Routes>
  );
});