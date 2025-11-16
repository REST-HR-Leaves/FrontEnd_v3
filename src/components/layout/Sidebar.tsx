import { useAuth } from '@/context/AuthContext';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CheckSquare, 
  User 
} from 'lucide-react';

export const Sidebar = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/leave-request', label: 'New Request', icon: FileText },
      { to: '/profile', label: 'Profile', icon: User },
    ];

    if (user?.role === 'hr') {
      baseItems.splice(2, 0, { 
        to: '/hr-dashboard', 
        label: 'HR Dashboard', 
        icon: Users 
      });
    }

    if (user?.role === 'manager') {
      baseItems.splice(2, 0, { 
        to: '/manager-review', 
        label: 'Manager Review', 
        icon: CheckSquare 
      });
    }

    return baseItems;
  };

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-white shadow-sm hidden lg:block">
      <nav className="flex flex-col gap-2 p-4">
        {getNavItems().map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-secondary text-white'
                    : 'text-foreground hover:bg-muted'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
