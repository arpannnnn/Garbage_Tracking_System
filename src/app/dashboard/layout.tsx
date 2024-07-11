import Header from '../../../components/layouts/header';
import Sidebar from '../../../components/layouts/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Of GTS Nepal',
  description: 'Dashboard layout for GTS Nepal',
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </>
  );
}
