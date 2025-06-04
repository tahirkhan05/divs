
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ShieldX, 
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusItemProps {
  title: string;
  date: string;
  status: "verified" | "pending" | "warning" | "rejected" | "processing";
}

interface VerificationStatusCardProps {
  documents: any[];
  biometrics: any[];
}

function StatusItem({ title, date, status }: StatusItemProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-identity-green" />;
      case "pending":
        return <Clock className="h-5 w-5 text-identity-blue" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-identity-orange" />;
      case "rejected":
        return <ShieldX className="h-5 w-5 text-destructive" />;
      case "processing":
        return <Loader2 className="h-5 w-5 text-identity-purple animate-spin" />;
    }
  };

  return (
    <div className="flex items-start gap-3 py-3">
      {getStatusIcon()}
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

export function VerificationStatusCard({ documents, biometrics }: VerificationStatusCardProps) {
  // Combine and sort all verifications by date
  const allVerifications = [
    ...documents.map(doc => ({
      title: `${doc.document_type} Verification`,
      date: new Date(doc.created_at).toLocaleDateString(),
      status: doc.status as any
    })),
    ...biometrics.map(bio => ({
      title: `${bio.biometric_type} Verification`,
      date: new Date(bio.created_at).toLocaleDateString(),
      status: bio.status as any
    }))
  ].slice(0, 5); // Show only latest 5

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
        <CardDescription>Recent verification activities</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        {allVerifications.length > 0 ? (
          allVerifications.map((item, index) => (
            <StatusItem
              key={index}
              title={item.title}
              date={item.date}
              status={item.status}
            />
          ))
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            No verification activities yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}
