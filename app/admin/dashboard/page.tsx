// app/admin/dashboard/page.tsx
import { adminMiddleware } from '@/lib/adminMiddleware';

export default async function AdminDashboard() {
    const session = await adminMiddleware();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {session.user.email}</p>
            {/* Admin-specifik innehåll här */}
        </div>
    );
}