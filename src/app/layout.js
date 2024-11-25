import "./globals.css";

export const metadata = {
  title: "Newsletter Signup",
  description: "Sign up to our exciting newsletter!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-slate-900 px-6 md:px-8 lg:px-10 [&>*]:w-full [&>*]:max-w-screen-lg [&>*]:m-auto">
        {children}
      </body>
    </html>
  );
}
