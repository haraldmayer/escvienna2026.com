export default function LanguageRedirect({ supportedLangs }) {
    // This function will run on the client side when loaded
  
    // Run redirect logic once when script loads
    if (typeof window !== "undefined") {
      const hasRedirected = sessionStorage.getItem("redirected");
      const pathname = window.location.pathname;
  
      if (pathname === "/" && !hasRedirected) {
        const userLangs = navigator.languages || [navigator.language || "en"];
        const userLang = userLangs
          .map((l) => l.slice(0, 2).toLowerCase())
          .find((l) => supportedLangs.includes(l));
  
        if (userLang && userLang !== "de") {
          sessionStorage.setItem("redirected", "true");
          window.location.replace(`/${userLang}/`);
        }
      }
    }
  
    return null; // no DOM output
  }
  