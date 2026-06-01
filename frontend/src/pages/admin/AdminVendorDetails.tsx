import { useParams, Link } from "react-router-dom";
import { useAdminVendorDetails } from "../../hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Loader2, Mail, MapPin, Briefcase, Calendar } from "lucide-react";

export function AdminVendorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: vendor, isLoading } = useAdminVendorDetails(id as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-neutral-900">Vendor not found</h2>
        <Link to="/admin/vendors">
          <Button className="mt-4 bg-indigo-600">Return to Vendors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/vendors">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">{vendor.vendorName}</h2>
          <p className="text-neutral-500 mt-1 flex items-center gap-2">
            <Badge variant="secondary">{vendor.category}</Badge>
            <span>ID: {vendor.id}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Category</p>
                <p className="font-medium">{vendor.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Location</p>
                <p className="font-medium">{vendor.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Public Contact</p>
                <p className="font-medium">{vendor.contactInfo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Login Email</p>
                <p className="font-medium">{(vendor as any).user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Joined Date</p>
                <p className="font-medium">{new Date((vendor as any).user?.createdAt || vendor.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Inquiries ({ (vendor as any).inquiries?.length || 0 })</CardTitle>
            <CardDescription>Latest inquiries received by this vendor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!(vendor as any).inquiries || (vendor as any).inquiries.length === 0 ? (
                <p className="text-sm text-neutral-500 py-2">No inquiries found.</p>
              ) : (
                (vendor as any).inquiries.map((inq: any) => (
                  <div key={inq.id} className="p-3 border border-neutral-100 rounded-lg bg-neutral-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-neutral-900">{inq.customerName}</span>
                      <Badge variant="outline" className={inq.status === "NEW" ? "bg-blue-50 text-blue-700" : ""}>
                        {inq.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-600">{inq.eventType} on {new Date(inq.eventDate).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Activity Log ({ (vendor as any).activities?.length || 0 })</CardTitle>
            <CardDescription>Recent actions performed by this vendor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!(vendor as any).activities || (vendor as any).activities.length === 0 ? (
                <p className="text-sm text-neutral-500 py-2">No activity found.</p>
              ) : (
                (vendor as any).activities.map((act: any) => (
                  <div key={act.id} className="flex gap-3 text-sm border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <div>
                      <p className="font-medium text-neutral-900">{act.action.replace("_", " ")}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{new Date(act.createdAt).toLocaleString()}</p>
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
