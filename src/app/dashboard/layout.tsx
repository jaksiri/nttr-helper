import Sidebar from "./components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-57px)] md:overflow-y-auto">
      <Sidebar />
      {children}
    </div>
  );
}
