import "@/styles/globals.css";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=GTM-TH5M28TZ"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MC2WMXZPS5', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />

      {/* Global Teal Background */}
      <style jsx global>{`
        body {
          background-color: #009A9A;
        }
      `}</style>
    </>
  );
}

export default MyApp;
