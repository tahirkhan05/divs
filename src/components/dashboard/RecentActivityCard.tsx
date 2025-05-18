
import { 
  ExternalLink, 
  ArrowDownUp, 
  ShieldCheck, 
  FileCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  hasAction?: boolean;
}

function ActivityItem({ icon, title, description, timestamp, hasAction }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="rounded-full bg-muted p-2">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          <time className="text-xs text-muted-foreground">{timestamp}</time>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {hasAction && (
          <Button variant="link" size="sm" className="h-8 px-0 py-1">
            View details
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function RecentActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest identity verification activities</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        <ActivityItem
          icon={<ShieldCheck className="h-4 w-4 text-primary" />}
          title="Identity verification requested"
          description="Financial Corp. requested identity verification"
          timestamp="Today, 11:42 AM"
          hasAction={true}
        />
        <ActivityItem
          icon={<ArrowDownUp className="h-4 w-4 text-secondary" />}
          title="Document shared with third party"
          description="Passport shared with Travel Agency Ltd."
          timestamp="Yesterday"
        />
        <ActivityItem
          icon={<FileCheck className="h-4 w-4 text-identity-green" />}
          title="New document verified"
          description="Address proof verified and added to your identity"
          timestamp="May 16, 2025"
        />
      </CardContent>
    </Card>
  );
}
