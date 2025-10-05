import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";
import { SideBar } from "@/components/account/SideBar";
import { Loading } from "@/ui/Loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:py-28 px-4 mx-auto max-w-[1100px] py-20 pt-28 font-world grid relative md:divide-x-1px divide-gray-400 grid-cols-1 md:grid-cols-5">
      <Loading />
      <SideBar />
      <div className="md:col-span-4 w-full md:pl-10 min-h-[400px] h-full space-y-14">
        <BreadCrumbs name="settings" />
        {children}
      </div>
    </div>
  );
}
