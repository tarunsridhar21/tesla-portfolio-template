import type { Metadata } from "next";
import { META } from "@/content/profile";
import "./styles/portfolio.css";

export const metadata: Metadata = {
  title: META.siteTitle,
  icons: { icon: "/favicon.svg" },
  description: META.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
