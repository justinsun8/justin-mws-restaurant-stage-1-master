/*
* checking browser for service worker support prior to implementation
*/

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then((registration) => {
      console.log('SW Reg success');
    })
    .catch((error) => {
      console.log('SW Reg Failed');
    });
  }