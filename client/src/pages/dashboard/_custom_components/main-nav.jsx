
import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

export function MainNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        to="/"
       
        className={({ isActive }) => cn(
          "text-sm font-medium transition-colors hover:text-primary",
          { "text-muted-foreground": !isActive }
        )}
      >
        Dashboard
      </NavLink>
     
      <NavLink
        to="/reports"
        
        className={({ isActive }) => cn(
          "text-sm font-medium transition-colors hover:text-primary",
          { "text-muted-foreground": !isActive }
        )}
      >
        Reports
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => cn(
          "text-sm font-medium transition-colors hover:text-primary",
          { "text-muted-foreground": !isActive }
        )}
      >
        Profile
      </NavLink>
    </nav>
  )}
