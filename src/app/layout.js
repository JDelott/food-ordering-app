// import { Roboto } from "next/font/google";
// import Header from "../components/layout/Header";
// import { AppProvider } from "@/components/AppContext";
// import { SessionProvider } from "next-auth/react";
// import "./globals.css";

// const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={roboto.className}>
//         <main className="max-w-4xl mx-auto p-4">
//           <AppProvider>
//             <Header />
//             {children}
//             <footer className="border-t p-8 text-center text-gray-500 mt-16">
//               &copy; 2024 All rights reserved{" "}
//             </footer>
//           </AppProvider>
//         </main>
//       </body>
//     </html>
//   );
// }

import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2023 All rights reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
