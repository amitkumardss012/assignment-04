export interface User {
  id: string;
  email: string;
  role: "VENDOR" | "CUSTOMER" | "ADMIN";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Inquiry {
  id: string;
  vendorId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  eventType: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "CONFIRMED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateInquiryData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  eventType: string;
  message?: string;
}

export interface UpdateInquiryStatusData {
  status: "NEW" | "CONTACTED" | "CONFIRMED" | "REJECTED";
}

export interface DashboardStats {
  totalInquiries: number;
  upcomingEvents: number;
}

export interface ActivityLog {
  vendor: any;
  id: string;
  vendorId: string;
  action: string;
  details: any;
  createdAt: string;
}

export interface AdminDashboardStats {
  totalVendors: number;
  totalInquiries: number;
  recentActivity: ActivityLog[];
}

export type VendorCategory = "PHOTOGRAPHY" | "VIDEOGRAPHY" | "CATERING" | "DECORATION" | "VENUE" | "MAKEUP" | "MUSIC";

export interface VendorProfile {
  id: string;
  userId: string;
  vendorName: string;
  category: VendorCategory;
  location: string;
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVendorData {
  vendorName: string;
  category: VendorCategory;
  location: string;
  contactInfo: string;
}

export interface UpdateVendorData {
  vendorName?: string;
  category?: VendorCategory;
  location?: string;
  contactInfo?: string;
}
