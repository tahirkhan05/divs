
import { useState } from "react";
import { Menu, LogIn, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { AuthDialog } from "./AuthDialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppHeader({ setSidebarOpen }: AppHeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <span className="text-lg font-semibold animate-fade-in">DIVS</span>
      </div>

      <div className="hidden lg:flex lg:flex-1 items-center gap-2">
        <h1 className="text-lg font-semibold flex items-center">
          <span className="text-primary font-bold">D</span>ecentralized
          <span className="text-primary font-bold ml-1">I</span>dentity
          <span className="text-primary font-bold ml-1">V</span>erification
          <span className="text-primary font-bold ml-1">S</span>ystem
        </h1>
      </div>

      {isAuthenticated && (
        <div className={`flex-1 ${searchVisible ? "flex" : "hidden md:flex"} justify-center px-4`}>
          <SearchBar />
        </div>
      )}

      <div className="flex items-center gap-2">
        {isAuthenticated && <NotificationsDropdown />}
        <ThemeToggle />
        
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.phone}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => setAuthDialogOpen(true)}>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </header>
  );
}
