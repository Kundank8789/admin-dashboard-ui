import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f6f7fb] dark:bg-[#07070a] text-zinc-900 dark:text-zinc-100">
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
