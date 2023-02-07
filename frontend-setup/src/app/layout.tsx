import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Log in</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Get your daily cat facts now, just log in" />
        <meta name="keywords" content="HTML, SASS, JavaScript, React.js, Next.js Exam project" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
