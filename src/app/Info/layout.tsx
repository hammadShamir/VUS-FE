import Header2 from "@/components/common/Header/Header2";
import { DashboardSidebar } from "@/components/common/Dashboard-Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative">
      <Header2 />
      <div className="flex h-full">
        <DashboardSidebar />
        {children}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default Layout;
