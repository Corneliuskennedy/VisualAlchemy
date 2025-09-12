import React, { useState } from 'react';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Shield, Plus, Menu, User, LogOut, Settings, BarChart3 } from 'lucide-react';

interface AppHeaderProps {
  onNewProject: () => void;
  onSignOut: () => void;
  userProfile?: {
    first_name?: string | null;
    last_name?: string | null;
    email?: string;
    company_name?: string | null;
  } | null;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

interface UserProfileDropdownProps {
  userProfile?: {
    first_name?: string | null;
    last_name?: string | null;
    email?: string;
    company_name?: string | null;
  } | null;
  onSignOut: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ userProfile, onSignOut }) => {
  const getDisplayName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    if (userProfile?.first_name) {
      return userProfile.first_name;
    }
    if (userProfile?.email) {
      return userProfile.email.split('@')[0];
    }
    return 'User';
  };

  const getInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    }
    if (userProfile?.first_name) {
      return userProfile.first_name[0].toUpperCase();
    }
    if (userProfile?.email) {
      return userProfile.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700"
          aria-label="User menu"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
            {getInitials()}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800" align="end" forceMount>
        <DropdownMenuLabel className="font-normal text-gray-300">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {getDisplayName()}
            </p>
            <p className="text-xs leading-none text-gray-400">
              {userProfile?.email}
            </p>
            {userProfile?.company_name && (
              <p className="text-xs leading-none text-gray-500">
                {userProfile.company_name}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer">
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Usage & Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-gray-800 hover:text-red-300 cursor-pointer"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileDrawer: React.FC<{ 
  activeTab?: string; 
  onTabChange?: (tab: string) => void; 
  onNewProject: () => void; 
}> = ({ activeTab, onTabChange, onNewProject }) => {
  const [open, setOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Shield },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange?.(tab);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-gray-900 border-gray-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-4 border-b border-gray-800">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">GDPR Compass</h2>
              <p className="text-sm text-gray-400">Compliance Management</p>
            </div>
          </div>
          
          <nav className="flex-1 py-4">
            <Button
              onClick={() => {
                onNewProject();
                setOpen(false);
              }}
              className="w-full mb-4 mx-4 bg-green-600 hover:bg-green-700 text-white border-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            
            <ul className="space-y-2 px-4">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full justify-start ${
                      activeTab === item.id 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  onNewProject,
  onSignOut,
  userProfile,
  activeTab,
  onTabChange
}) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <MobileDrawer 
              activeTab={activeTab} 
              onTabChange={onTabChange} 
              onNewProject={onNewProject}
            />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">GDPR Compliance Compass</h1>
                <p className="text-sm text-gray-400 hidden md:block">Smart, project-based GDPR compliance management</p>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={onNewProject}
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-none shadow-lg"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
            
            <UserProfileDropdown userProfile={userProfile} onSignOut={onSignOut} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 