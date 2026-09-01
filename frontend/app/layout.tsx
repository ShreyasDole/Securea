import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/layout/Shell";
import { ThemeProvider } from "@/lib/theme-context";
import { FirmProvider } from "@/lib/firm-context";

export const metadata: Metadata = {
  title: "SECUREA — Financial Operating Platform",
  description: "The System of Financial Decisions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body>
        <FirmProvider>
          <ThemeProvider>
            <Shell>{children}</Shell>
          </ThemeProvider>
        </FirmProvider>
      </body>
    </html>
  );
}
