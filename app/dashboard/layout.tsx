import Sidenav from "@/components/Dashboard/Sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-row ">
      <Sidenav />
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
