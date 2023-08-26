import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord Clone Login",
  description: "Discord Clone Login",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}
