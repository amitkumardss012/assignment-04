import { useAdminStats } from "../../hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Users, Inbox, Activity } from "lucide-react";
import { Loader2 } from "lucide-react";

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Platform Overview</h2>
        <p className="text-neutral-500 mt-2">
          Monitor your platform's overall performance and recent vendor activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Active Vendors</CardTitle>
            <Users className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neutral-900">{stats?.totalVendors || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Platform Inquiries</CardTitle>
            <Inbox className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-neutral-900">{stats?.totalInquiries || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            Recent Platform Activity
          </CardTitle>
          <CardDescription>Latest actions taken by vendors across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentActivity?.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-4">No recent activity.</p>
            ) : (
              stats?.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-neutral-50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {activity.vendor?.vendorName} <span className="font-normal text-neutral-600">performed</span> {activity.action.replace("_", " ")}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
