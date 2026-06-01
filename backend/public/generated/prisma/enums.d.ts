export declare const Role: {
    readonly VENDOR: "VENDOR";
    readonly CUSTOMER: "CUSTOMER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const InquiryStatus: {
    readonly NEW: "NEW";
    readonly CONTACTED: "CONTACTED";
    readonly CONFIRMED: "CONFIRMED";
    readonly REJECTED: "REJECTED";
};
export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus];
export declare const VendorCategory: {
    readonly PHOTOGRAPHY: "PHOTOGRAPHY";
    readonly CATERING: "CATERING";
    readonly VENUE: "VENUE";
    readonly DECORATION: "DECORATION";
    readonly MUSIC: "MUSIC";
    readonly PLANNING: "PLANNING";
    readonly OTHER: "OTHER";
};
export type VendorCategory = (typeof VendorCategory)[keyof typeof VendorCategory];
//# sourceMappingURL=enums.d.ts.map