import Header from '../../../components/layouts/header';
import Sidebar from '../../../components/layouts/sidebar';
import type { Metadata } from 'next';
import SidebarAdmin from './sidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard Of GTS Nepal',
  description: ' Admin Dashboard Of GTS Nepal',
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen  overflow-hidden">
        <SidebarAdmin />
        <main className="flex-1 overflow-y-auto bg-white" >{children}</main>
      </div>
    </>
  );
}