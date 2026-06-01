import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useUpdateVendorProfile, useVendorProfile } from "../hooks/useVendor";

const profileSchema = z.object({
  vendorName: z.string().min(2, "Vendor name must be at least 2 characters"),
  category: z.enum(["PHOTOGRAPHY", "VIDEOGRAPHY", "CATERING", "DECORATION", "VENUE", "MAKEUP", "MUSIC"]),
  location: z.string().min(2, "Location must be at least 2 characters"),
  contactInfo: z.string().min(5, "Contact info must be at least 5 characters"),
});

export function ProfilePage() {
  const { data: profile, isLoading } = useVendorProfile();
  const { mutate: updateProfile, isPending } = useUpdateVendorProfile();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: profile ? {
      vendorName: profile.vendorName,
      category: profile.category,
      location: profile.location,
      contactInfo: profile.contactInfo,
    } : undefined,
    defaultValues: {
      vendorName: "",
      category: "PHOTOGRAPHY",
      location: "",
      contactInfo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    updateProfile(values);
  };

  if (isLoading) {
    return <div className="p-8 text-neutral-500">Loading profile data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Vendor Profile</h2>
        <p className="text-neutral-500 mt-2">
          Manage your public vendor profile and business information.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>
            This information will be displayed to customers looking to book your services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="StarVnt Studios" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Category</FormLabel>
                    <Select key={field.value} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
                        <SelectItem value="MAKEUP">Makeup & Styling</SelectItem>
                        <SelectItem value="MUSIC">Music & Entertainment</SelectItem>
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
                      <Input placeholder="New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@starvnt.com or (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
