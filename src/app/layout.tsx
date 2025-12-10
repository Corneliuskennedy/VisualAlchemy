import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Typography System: Archivo + Inter + JetBrains Mono (for data)
const archivo = Archivo({ 
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "optional",
  preload: true,
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "optional",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "optional",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Critical CSS - Inlined for faster FCP/LCP */}
        <style dangerouslySetInnerHTML={{ __html: `
:root {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 0%;
  --radius: 0.5rem;
}
.dark {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 0%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: var(--font-archivo), system-ui, -apple-system, sans-serif;
  background-color: #050505;
  color: hsl(var(--foreground));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
h1 {
  font-family: var(--font-archivo), system-ui, sans-serif;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
img {
  max-width: 100%;
  height: auto;
}
        ` }} />
        
        {/* Favicon - Octomatic */}
        <link rel="icon" href="/faviconOctomatic.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo/octomatic-200.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#050505" />
        
        {/* SEO Meta Tags */}
        <title>Visual Alchemy | Viral Visuals for Finance Creators</title>
        <meta name="description" content="Turn raw audio into high-retention Visual Essays. No camera required. Engineering virality for finance creators." />
        <meta name="keywords" content="visual essays, finance content, video editing, content creation, viral content" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visuals.octomatic.ai/" />
        <meta property="og:title" content="Visual Alchemy | Viral Visuals for Finance Creators" />
        <meta property="og:description" content="Turn raw audio into high-retention Visual Essays. No camera required." />
        <meta property="og:image" content="https://visuals.octomatic.ai/images/Graph_Image_visual_Alchemy.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1201" />
        <meta property="og:image:height" content="631" />
        <meta property="og:image:alt" content="Visual Alchemy - Viral Visuals for Finance Creators" />
        <meta property="og:site_name" content="Visual Alchemy" />
        <meta property="og:locale" content="en_US" />
        {/* Facebook App ID - Add your Facebook App ID here if you have one */}
        {/* <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" /> */}
        
        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@octomatic_ai" />
        <meta name="twitter:creator" content="@octomatic_ai" />
        <meta name="twitter:title" content="Visual Alchemy | Viral Visuals for Finance Creators" />
        <meta name="twitter:description" content="Turn raw audio into high-retention Visual Essays. No camera required." />
        <meta name="twitter:image" content="https://visuals.octomatic.ai/images/Graph_Image_visual_Alchemy.png" />
        <meta name="twitter:image:alt" content="Visual Alchemy - Viral Visuals for Finance Creators" />
        
        {/* LinkedIn - Uses Open Graph tags, but adding specific tags for better compatibility */}
        <meta property="og:image:secure_url" content="https://visuals.octomatic.ai/images/Graph_Image_visual_Alchemy.png" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://visuals.octomatic.ai/" />
        
        {/* Performance: Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} ${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#050505] text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
