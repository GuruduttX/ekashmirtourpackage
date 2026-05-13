import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'eKashmir CMS',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
