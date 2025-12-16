import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Bell, SearchIcon, Settings } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="bg-header flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-base font-medium">Dashboard</h1>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput id="search" name="search" placeholder="Search here..." />
            <InputGroupAddon align="inline-end">
              <div className="bg-luxury-black-600 text-grayscale-500 rounded-xs px-[4px] py-[2px]">
                ⌘+K
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="secondary" size="sm" className="hidden sm:flex">
            <Settings className="text-grayscale-500" />
            Setting
          </Button>
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>
        </div>
      </div>
    </header>
  );
}
