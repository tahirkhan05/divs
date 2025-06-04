
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

interface RecentActivityCardProps {
  activities: any[];
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

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document_verification':
        return <FileCheck className="h-4 w-4 text-identity-green" />;
      case 'biometric_verification':
        return <ShieldCheck className="h-4 w-4 text-primary" />;
      case 'identity_share':
        return <ArrowDownUp className="h-4 w-4 text-secondary" />;
      default:
        return <ShieldCheck className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest identity verification activities</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        {activities.length > 0 ? (
          activities.slice(0, 5).map((activity, index) => (
            <ActivityItem
              key={index}
              icon={getActivityIcon(activity.activity_type)}
              title={activity.activity_description}
              description={`Activity logged for ${activity.activity_type}`}
              timestamp={new Date(activity.created_at).toLocaleDateString()}
              hasAction={true}
            />
          ))
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            No recent activities
          </div>
        )}
      </CardContent>
    </Card>
  );
}
