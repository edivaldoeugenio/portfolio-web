export const dynamic = 'force-dynamic'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { AdminDashboard } from './_components/admin-dashboard'

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }
  return <AdminDashboard userEmail={(session?.user as any)?.email ?? ''} />
}
