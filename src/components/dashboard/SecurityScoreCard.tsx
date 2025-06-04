
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SecurityScoreCardProps {
  score: number;
  documentScore: number;
  biometricScore: number;
  businessScore: number;
}

export function SecurityScoreCard({ score, documentScore, biometricScore, businessScore }: SecurityScoreCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Security Score</CardTitle>
        <CardDescription>Your identity verification strength</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                className={`text-primary transition-all duration-1000 ease-in-out`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-4xl font-bold">{score}</div>
              <div className="text-xs text-muted-foreground">/ 100</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Document verification</span>
              <span className="font-medium">{documentScore}%</span>
            </div>
            <Progress value={documentScore} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Biometric match</span>
              <span className="font-medium">{biometricScore}%</span>
            </div>
            <Progress value={biometricScore} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Business verification</span>
              <span className="font-medium">{businessScore}%</span>
            </div>
            <Progress value={businessScore} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Multi-factor security</span>
              <span className="font-medium">{Math.min(100, score + 10)}%</span>
            </div>
            <Progress value={Math.min(100, score + 10)} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
