import "./globals.css";
import Providers from "../components/Provider"; 
import Header from "../components/Header";  
import Footer from "../components/Footer";
export const metadata = {
  title: "My Store",
  description: "Next.js Redux Store Example",
  icons: {
    icon: "/wicker-basket.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
