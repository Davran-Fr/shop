import { SideBar } from "@/components/settings/SideBar";
import { Container } from "@/ui/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="py-32 font-world grid lg:divide-x-1px gap-y-10 divide-gray-400 grid-cols-1 lg:grid-cols-5">
      <SideBar />
      <div className="lg:col-span-3 px-10 min-h-[300px] h-full">{children}</div>
    </Container>
  );
}
