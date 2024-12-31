import MainHeader from "@/components/main-header/main-header";

import "@/styles/globals.css";

// Next.js looks for exported constants or variables called metadata for all pages and layouts
export const metadata = {
    title: "NextLevel Food",
    description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <MainHeader />
                {children}
            </body>
        </html>
    );
}
