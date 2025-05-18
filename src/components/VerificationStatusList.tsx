
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationStatus, VerificationStatusType } from "@/components/VerificationStatus";

interface VerificationItem {
  title: string;
  date: string;
  status: VerificationStatusType;
  details?: string;
}

interface VerificationStatusListProps {
  items: VerificationItem[];
}

export function VerificationStatusList({ items }: VerificationStatusListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
        <CardDescription>Recent verification activities</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3 py-3">
            <VerificationStatus status={item.status} showLabel={false} />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <VerificationStatus status={item.status} />
              </div>
              <p className="text-xs text-muted-foreground">{item.date}</p>
              {item.details && (
                <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
