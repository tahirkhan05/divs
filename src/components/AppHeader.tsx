
import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface AppHeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppHeader({ setSidebarOpen }: AppHeaderProps) {
  const [searchVisible, setSearchVisible] = useState(false);

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

      <div className={`flex-1 ${searchVisible ? "flex" : "hidden md:flex"} justify-center px-4`}>
        <div className="w-full max-w-sm relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search verifications..."
            className="w-full pl-8 rounded-full bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSearchVisible(!searchVisible)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Toggle search</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
