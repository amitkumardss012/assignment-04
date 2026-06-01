import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useInquiries, useUpdateInquiryStatus, useCreateInquiry } from "../hooks/useInquiry";
import { useVendorProfile } from "../hooks/useVendor";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Plus } from "lucide-react";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  CONTACTED: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  CONFIRMED: "bg-green-100 text-green-800 hover:bg-green-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
};

const createInquirySchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(5, "Phone number is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventType: z.string().min(2, "Event type is required"),
  message: z.string().optional(),
});

export function InquiriesPage() {
  const { data: inquiries, isLoading } = useInquiries();
  const { mutate: updateStatus } = useUpdateInquiryStatus();
  
  // For Manual Inquiry Creation
  const { data: profile } = useVendorProfile();
  const { mutate: createInquiry, isPending: isCreating } = useCreateInquiry();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createInquirySchema>>({
    resolver: zodResolver(createInquirySchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      eventDate: "",
      eventType: "",
      message: "",
    },
  });

  const handleStatusChange = (id: string, newStatus: any) => {
    updateStatus({ id, data: { status: newStatus } });
  };

  const onSubmit = (values: z.infer<typeof createInquirySchema>) => {
    if (!profile) return;
    
    createInquiry(
      {
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        eventDate: new Date(values.eventDate).toISOString(),
        eventType: values.eventType,
        message: values.message,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          form.reset();
        },
      }
    );
  };

  if (isLoading) {
    return <div className="p-8 text-neutral-500">Loading inquiries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Event Inquiries</h2>
          <p className="text-neutral-500 mt-2">
            Manage your incoming booking requests and update their statuses.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Manual Inquiry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Manual Inquiry</DialogTitle>
              <DialogDescription>
                Create an inquiry manually for clients who contacted you outside the platform.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Wedding Reception" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes / Message</FormLabel>
                      <FormControl>
                        <Input placeholder="Customer called directly..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isCreating || !profile}>
                    {isCreating ? "Saving..." : "Save Inquiry"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
          <CardDescription>A list of all customers who have contacted you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-neutral-500">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                inquiries?.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">
                      <div>{inquiry.customerName}</div>
                      <div className="text-xs text-neutral-500 font-normal">{inquiry.customerEmail}</div>
                      <div className="text-xs text-neutral-500 font-normal">{inquiry.customerPhone}</div>
                    </TableCell>
                    <TableCell>{new Date(inquiry.eventDate).toLocaleDateString()}</TableCell>
                    <TableCell>{inquiry.eventType}</TableCell>
                    <TableCell className="max-w-xs truncate" title={inquiry.message || ""}>
                      {inquiry.message || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[inquiry.status] || "bg-neutral-100"} variant="outline">
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={inquiry.status}
                        onValueChange={(val) => handleStatusChange(inquiry.id, val)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">New</SelectItem>
                          <SelectItem value="CONTACTED">Contacted</SelectItem>
                          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
