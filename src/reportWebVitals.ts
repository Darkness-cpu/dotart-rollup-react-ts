type PerformanceEntry = PerformanceEntry & {
  value?: number
};

interface WebVitals {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number
}

const webVitals: WebVitals = {};

const getNavigationTiming = () => {
  try {
     const navigationEntry = performance
    .getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const { responseStart, loadEventEnd } = navigationEntry

    const ttfb = responseStart - navigationEntry.startTime;
    const fullLoad = loadEventEnd - navigationEntry.startTime;
      webVitals.ttfb = ttfb;
      return { fullLoad, ttfb };

  } catch (e) {
    return null;
  }

}
  getNavigationTiming();

const observe = (type: string, callback: (value: number) => void) => {
  try {

   const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
      if (type === 'CLS'){
        let value = 0;
        if ('value' in entry){
          value = (entry as PerformanceEntry).value || 0;
        }

        webVitals.cls = value
        callback(value)
        return
      }

      if ('duration' in entry){
         let value = (entry as PerformanceEntry).duration || 0;
         switch (type) {
          case 'FCP':
              webVitals.fcp = value
              break;
          case 'LCP':
               webVitals.lcp = value
              break;
          case 'FID':
              webVitals.fid = value
              break;
          default:
             break;
        }
        callback(value);
      }

     });
    });
    observer.observe({ type: type as PerformanceEntryType, buffered: true });
  } catch (e) {
    // No Perf API support
    console.log(e)
  }
};


const measureLCP = (callback: (value: number) => void) => {
  observe('LCP', callback);
};

const measureFID = (callback: (value: number) => void) => {
  observe('FID', callback);
};

const measureCLS = (callback: (value: number) => void) => {
   observe('CLS', callback);
};


const measureFCP = (callback: (value: number) => void) => {
    observe('paint', (value) => {
      if ('name' in window.performance.getEntriesByType('paint')[0] && window.performance.getEntriesByType('paint')[0].name === 'first-contentful-paint'){
         callback(value)
      }

    });
}


export  {measureLCP, measureFID, measureCLS, measureFCP, webVitals, getNavigationTiming };
