import React, { useState, useEffect } from 'react';
import { measureLCP, measureFID, measureCLS, measureFCP, webVitals, getNavigationTiming } from './reportWebVitals';

const VitalsDisplay: React.FC = () => {
    const [lcp, setLcp] = useState<number | null>(null);
    const [fid, setFid] = useState<number | null>(null);
    const [cls, setCls] = useState<number | null>(null);
    const [fcp, setFcp] = useState<number | null>(null);
    const [ttfb, setTtfb] = useState<number | null>(null);



    useEffect(() => {
        measureLCP(value => setLcp(value));
        measureFID(value => setFid(value));
        measureCLS(value => setCls(value));
        measureFCP(value => setFcp(value));
        setTtfb(webVitals.ttfb || null);

        return () => {
        };

      }, []);


  return (
    <div>
        <h2>Web Vitals</h2>
        <p>LCP: {lcp === null ? 'Loading...' : `${lcp.toFixed(2)}ms`}</p>
        <p>FID: {fid === null ? 'Loading...' : `${fid.toFixed(2)}ms`}</p>
        <p>CLS: {cls === null ? 'Loading...' : `${cls.toFixed(2)}`}</p>
        <p>FCP: {fcp === null ? 'Loading...' : `${fcp.toFixed(2)}ms`}</p>
        <p>TTFB: {ttfb === null ? 'Loading...' : `${ttfb.toFixed(2)}ms`}</p>
      </div>
  );
};

export default VitalsDisplay;
