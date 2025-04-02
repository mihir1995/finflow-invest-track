
import React, { ReactNode } from "react";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  hideNavigation?: boolean;
}

const MobileLayout = ({ 
  children, 
  className, 
  hideNavigation = false 
}: MobileLayoutProps) => {
  return (
    <div className="flex flex-col min-h-full">
      <main className={cn("flex-1 pb-16", className)}>
        {children}
      </main>
      {!hideNavigation && <BottomNav />}
    </div>
  );
};

export default MobileLayout;
