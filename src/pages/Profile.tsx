import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User as UserIcon, Phone, MapPin, Scale, Briefcase, GraduationCap, Gavel } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer"; // ✅ make sure you have a Footer component in components

type Role = "citizen" | "lawyer" | "judge";

type User = {
  _id?: string;
  name?: string;
  email: string;
  type: Role;
  phone?: string;
  location?: string;
  barRegistration?: string;
  specialization?: string;
  experience?: string;
  fees?: string;
  qualifications?: string;
  about?: string;
};

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function FieldRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
      <div className="w-40 shrink-0 text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-sm leading-relaxed break-words">
        {value && value.trim().length > 0 ? value : <span className="text-muted-foreground">N/A</span>}
      </div>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const roleLabel = useMemo(() => {
    if (!user) return "";
    return user.type === "citizen" ? "Citizen" : user.type === "lawyer" ? "Lawyer" : "Judge";
  }, [user]);

  if (!user) {
    return (
      <>
        <Header />
        <div className="container max-w-3xl py-12">
          <Card>
            <CardHeader>
              <CardTitle>Sign in required</CardTitle>
              <CardDescription>Please sign in to view your profile.</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="container max-w-3xl py-8 space-y-6">
        {/* Header / Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" />
              Your Profile
            </CardTitle>
            <CardDescription>Overview of your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-2 py-1">
                {roleLabel}
              </Badge>
              {user.barRegistration && user.type === "lawyer" && (
                <Badge variant="outline">Bar Reg: {user.barRegistration}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>General contact and account data</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldRow label="Full Name" value={user.name} />
            <Separator />
            <FieldRow label="Email" value={user.email} />
            <Separator />
            <FieldRow icon={<Phone className="w-4 h-4" />} label="Phone" value={user.phone} />
            <Separator />
            <FieldRow icon={<MapPin className="w-4 h-4" />} label="Location" value={user.location} />
            <Separator />
            <FieldRow label="Role" value={roleLabel} />
          </CardContent>
        </Card>

        {/* Role-Specific Sections */}
        {user.type === "lawyer" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Lawyer Details
              </CardTitle>
              <CardDescription>Professional information</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldRow label="Bar Registration" value={user.barRegistration} />
              <Separator />
              <FieldRow label="Specialization" value={user.specialization} />
              <Separator />
              <FieldRow label="Experience (Years)" value={user.experience} />
              <Separator />
              <FieldRow label="Consultation Fees (₹/hour)" value={user.fees} />
              <Separator />
              <FieldRow icon={<GraduationCap className="w-4 h-4" />} label="Qualifications" value={user.qualifications} />
              <Separator />
              <FieldRow label="About" value={user.about} />
            </CardContent>
          </Card>
        )}

        {user.type === "judge" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-primary" />
                Judge Details
              </CardTitle>
              <CardDescription>Court and service information</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldRow label="Court Level" value={user.specialization} />
              <Separator />
              <FieldRow label="Years on Bench" value={user.experience} />
              <Separator />
              <FieldRow icon={<MapPin className="w-4 h-4" />} label="Court Location" value={user.location} />
              <Separator />
              <FieldRow icon={<GraduationCap className="w-4 h-4" />} label="Judicial Qualifications" value={user.qualifications} />
            </CardContent>
          </Card>
        )}

        {user.type === "citizen" && (
          <Card>
            <CardHeader>
              <CardTitle>Citizen Details</CardTitle>
              <CardDescription>Additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldRow icon={<GraduationCap className="w-4 h-4" />} label="Qualifications" value={user.qualifications} />
              <Separator />
              <FieldRow label="About" value={user.about} />
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </>
  );
}
