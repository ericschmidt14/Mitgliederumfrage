import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "1. FCN Mitgliederumfrage 2025 Q1",
  description: "",
};

const theme = createTheme({
  fontFamily: "Glober Regular",
  headings: { fontFamily: "Glober ExtraBold" },
  primaryColor: "red",
  colors: {
    red: [
      "#fdecef",
      "#f5d6da",
      "#efa8b1",
      "#ea7884",
      "#e6515f",
      "#e33948",
      "#aa1124",
      "#c9222f",
      "#b41b29",
      "#9e1021",
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Suspense>
            <main className="min-h-screen flex flex-col justify-between">
              <div className="flex flex-col justify-between">{children}</div>
              <Footer />
            </main>
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
