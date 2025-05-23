
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FilePlus, 
  ShieldCheck, 
  Fingerprint, 
  BarChart3,
  Settings, 
  HelpCircle,
  X,
  QrCode,
  User,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, href, label, isActive }: SidebarItemProps) {
  return (
    <Link to={href} className="w-full">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 font-medium border-transparent",
          isActive 
            ? "bg-secondary/20 text-secondary border-secondary/30 border" 
            : "hover:bg-secondary/10 hover:border-secondary/20 hover:border"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-secondary" : "text-muted-foreground")} />
        {label}
      </Button>
    </Link>
  );
}

export function AppSidebar({ sidebarOpen, setSidebarOpen }: AppSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Close sidebar when route changes (on mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [setSidebarOpen]);

  // Close sidebar when clicking outside (on mobile)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        const sidebar = document.getElementById("app-sidebar");
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        id="app-sidebar"
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 border-r border-border bg-sidebar transition-transform duration-300 ease-in-out",
          "lg:z-0 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-verification p-1 rounded-md w-8 h-8 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DIVS</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 top-4 lg:hidden"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <SidebarItem icon={Home} href="/" label="Dashboard" isActive={currentPath === "/"} />
          <SidebarItem icon={FilePlus} href="/document-verification" label="Document Verification" isActive={currentPath === "/document-verification"} />
          <SidebarItem icon={Fingerprint} href="/biometric-verification" label="Biometric Verification" isActive={currentPath === "/biometric-verification"} />
          <SidebarItem icon={Briefcase} href="/business-verification" label="Business Verification" isActive={currentPath === "/business-verification"} />
          <SidebarItem icon={QrCode} href="/qr-verify" label="QR Verification" isActive={currentPath === "/qr-verify"} />
          <SidebarItem icon={BarChart3} href="/security-score" label="Security Score" isActive={currentPath === "/security-score"} />
          <SidebarItem icon={User} href="/my-identity" label="My Identity" isActive={currentPath === "/my-identity"} />
          
          <div className="mt-auto pt-4 border-t border-border space-y-1">
            <SidebarItem icon={Settings} href="/settings" label="Settings" isActive={currentPath === "/settings"} />
            <SidebarItem icon={HelpCircle} href="/help" label="Help & Support" isActive={currentPath === "/help"} />
          </div>
        </nav>
      </aside>
    </>
  );
}
