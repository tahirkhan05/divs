
import { 
  FileCheck, 
  ShieldCheck, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Verified Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">4</div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <FileCheck className="h-4 w-4 text-identity-green" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">+1 in the last 30 days</p>
        </CardContent>
      </Card>
      
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">86/100</div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <ShieldCheck className="h-4 w-4 text-identity-blue" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">+12 from last verification</p>
        </CardContent>
      </Card>
      
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">2</div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
              <Clock className="h-4 w-4 text-identity-orange" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Action needed soon</p>
        </CardContent>
      </Card>
      
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">1</div>
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Unusual access detected</p>
        </CardContent>
      </Card>
    </div>
  );
}
