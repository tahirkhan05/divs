
import { CheckCircle, Clock, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type VerificationStatusType = "finished" | "in-process" | "initiated";

interface VerificationStatusProps {
  status: VerificationStatusType;
  showLabel?: boolean;
  className?: string;
}

export function VerificationStatus({ 
  status, 
  showLabel = true,
  className 
}: VerificationStatusProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "finished":
        return {
          icon: <CheckCircle className="h-4 w-4 text-identity-green" />,
          label: "Verified",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          textColor: "text-identity-green"
        };
      case "in-process":
        return {
          icon: <Clock className="h-4 w-4 text-identity-blue animate-pulse" />,
          label: "In Process",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          textColor: "text-identity-blue"
        };
      case "initiated":
        return {
          icon: <CircleDashed className="h-4 w-4 text-identity-orange" />,
          label: "Initiated",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
          textColor: "text-identity-orange"
        };
      default:
        return {
          icon: <CircleDashed className="h-4 w-4 text-muted-foreground" />,
          label: "Unknown",
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
          textColor: "text-muted-foreground"
        };
    }
  };

  const { icon, label, bgColor, textColor } = getStatusDetails();

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 px-2 py-1 border-none ${bgColor} ${textColor} ${className}`}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </Badge>
  );
}
