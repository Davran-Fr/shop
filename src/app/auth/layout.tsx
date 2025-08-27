import { Layout } from "@/components/forms/Layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout children={children} />;
}
