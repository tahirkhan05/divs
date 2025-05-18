
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

export function VerificationStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
        <CardDescription>Recent verification activities</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        <StatusItem
          title="Passport Verification Completed"
          date="Today, 10:42 AM"
          status="verified"
        />
        <StatusItem
          title="Biometric Authentication"
          date="In progress..."
          status="processing"
        />
        <StatusItem
          title="Address Proof Document"
          date="Awaiting review"
          status="pending"
        />
        <StatusItem
          title="Unusual Login Location"
          date="Yesterday, 11:23 PM"
          status="warning"
        />
        <StatusItem
          title="Identity Card Submission"
          date="May 16, 2025"
          status="rejected"
        />
      </CardContent>
    </Card>
  );
}
