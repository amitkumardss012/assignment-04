import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useAdminVendors, useCreateVendor } from "../../hooks/useAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Plus, Eye, Loader2 } from "lucide-react";

const createVendorSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  vendorName: z.string().min(2, "Business name is required"),
  category: z.enum(["PHOTOGRAPHY", "VIDEOGRAPHY", "CATERING", "DECORATION", "VENUE", "MAKEUP", "MUSIC"]),
  location: z.string().min(2, "Location is required"),
  contactInfo: z.string().min(5, "Contact info is required"),
});

export function AdminVendorsPage() {
  const { data: vendors, isLoading } = useAdminVendors();
  const { mutate: createVendor, isPending: isCreating } = useCreateVendor();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createVendorSchema>>({
    resolver: zodResolver(createVendorSchema),
    defaultValues: {
      email: "",
      password: "",
      vendorName: "",
      category: "PHOTOGRAPHY",
      location: "",
      contactInfo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createVendorSchema>) => {
    createVendor(values, {
      onSuccess: () => {
        setIsDialogOpen(false);
        form.reset();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Vendors</h2>
          <p className="text-neutral-500 mt-2">
            Manage all vendors registered on the platform.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
              <DialogDescription>
                Create a new vendor account. This will automatically generate a vendor profile and login credentials.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Login Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="vendor@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="vendorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="StarVnt Entertainment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select key={field.value} onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PHOTOGRAPHY">Photography</SelectItem>
                            <SelectItem value="VIDEOGRAPHY">Videography</SelectItem>
                            <SelectItem value="CATERING">Catering</SelectItem>
                            <SelectItem value="DECORATION">Decoration</SelectItem>
                            <SelectItem value="VENUE">Venue</SelectItem>
                            <SelectItem value="MAKEUP">Makeup</SelectItem>
                            <SelectItem value="MUSIC">Music</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Kolkata" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public Contact Email/Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="contact@vendor.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Vendor"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
          <CardDescription>A complete list of registered service providers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Inquiries Received</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-neutral-500">
                    No vendors found.
                  </TableCell>
                </TableRow>
              ) : (
                vendors?.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">
                      <div>{vendor.vendorName}</div>
                      <div className="text-xs text-neutral-500 font-normal">{(vendor as any).user?.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                        {vendor.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
                        {(vendor as any)._count?.inquiries || 0}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(vendor.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/admin/vendors/${vendor.id}`}>
                        <Button variant="outline" size="sm" className="gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
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
