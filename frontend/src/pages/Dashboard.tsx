import { useDashboardStats, useUpcomingEvents, useRecentActivity } from "../hooks/useDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Inbox, Calendar, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: events, isLoading: eventsLoading } = useUpcomingEvents();
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity();

  if (statsLoading || eventsLoading || activitiesLoading) {
    return <div className="p-8 text-neutral-500">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h2>
        <p className="text-neutral-500 mt-2">
          Overview of your vendor business metrics and upcoming schedule.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Inbox className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalInquiries || 0}</div>
            <p className="text-xs text-neutral-500 mt-1">All time booking requests</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.upcomingEvents || 0}</div>
            <p className="text-xs text-neutral-500 mt-1">Confirmed future events</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Events Table */}
        <Card className="shadow-sm col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
            <CardDescription>Your confirmed bookings coming up next.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-neutral-500">
                      No upcoming events
                    </TableCell>
                  </TableRow>
                ) : (
                  events?.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {new Date(event.eventDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{event.eventType}</TableCell>
                      <TableCell className="truncate max-w-[150px]">
                        <div>{event.customerName}</div>
                        <div className="text-xs text-neutral-500 font-normal">{event.customerEmail}</div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="shadow-sm col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your vendor profile.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto pr-4">
            <div className="space-y-4">
              {activities?.length === 0 ? (
                <div className="text-center py-6 text-neutral-500">No recent activity</div>
              ) : (
                activities?.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="bg-neutral-100 p-2 rounded-full mt-0.5 shrink-0">
                      <Activity className="h-4 w-4 text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {activity.action.replace(/_/g, ' ')}
                      </p>
                      <p className="text-xs text-neutral-500">
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
    </div>
  );
}
