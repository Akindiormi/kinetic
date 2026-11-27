import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KINETIC — Move with purpose",
    template: "%s | KINETIC",
  },
  description:
    "A connected fitness experience built around your goals, your routine, and your gym community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
