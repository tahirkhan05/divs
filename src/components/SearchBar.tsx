
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const mockSearchData = [
  { id: '1', title: 'Document Verification', url: '/document-verification', type: 'page' },
  { id: '2', title: 'Biometric Verification', url: '/biometric-verification', type: 'page' },
  { id: '3', title: 'Business Verification', url: '/business-verification', type: 'page' },
  { id: '4', title: 'QR Verification', url: '/qr-verify', type: 'page' },
  { id: '5', title: 'Security Score', url: '/security-score', type: 'page' },
  { id: '6', title: 'My Identity', url: '/my-identity', type: 'page' },
  { id: '7', title: 'Settings', url: '/settings', type: 'page' },
  { id: '8', title: 'Help & Support', url: '/help', type: 'page' },
  { id: '9', title: 'Passport Verification', url: '/document-verification', type: 'feature' },
  { id: '10', title: 'Identity Card Upload', url: '/document-verification', type: 'feature' },
  { id: '11', title: 'Fingerprint Scan', url: '/biometric-verification', type: 'feature' },
  { id: '12', title: 'Face Recognition', url: '/biometric-verification', type: 'feature' },
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue) {
      const filtered = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [inputValue, setSearchResults]);

  const handleSelect = (url: string) => {
    navigate(url);
    setOpen(false);
    setInputValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search verifications..."
            className="w-full pl-8 rounded-full bg-background"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setOpen(e.target.value.length > 0);
            }}
            onFocus={() => inputValue.length > 0 && setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {searchResults.length > 0 && (
              <CommandGroup heading="Results">
                {searchResults.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.url)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {item.type}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
