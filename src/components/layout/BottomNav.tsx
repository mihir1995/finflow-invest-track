
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Home, PieChart, Plus, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Wallet, label: "Transactions", path: "/transactions" },
  { icon: Plus, label: "Add", path: "/add-transaction", highlight: true },
  { icon: BarChart3, label: "Investments", path: "/investments" },
  { icon: PieChart, label: "Reports", path: "/reports" },
];

const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe mobile-safe-area z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.highlight ? (
                <div className="rounded-full bg-accent p-3 -mt-6 shadow-md">
                  <item.icon size={22} className="text-white" />
                </div>
              ) : (
                <item.icon size={22} />
              )}
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
