import {
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { UserMenuProps } from "@/interfaces/Auth";
import { useEffect, useState } from "react";
import { DashboardMenuItem, UserRoles } from "@/interfaces";
import { getUser } from "@/services/helper";
import { adminDashboardMenus, userDashboardMenus } from "../../public/assets/data/MenuLinks";

export const UserMenu: React.FC<UserMenuProps> = (props) => {
  const [Menus, setMenus] = useState<DashboardMenuItem[]>([]);
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  useEffect(() => {
    const role = getUser().role;
    if (role === UserRoles.USER) {
      setMenus(userDashboardMenus)
    } else if (role === UserRoles.ADMIN) {
      setMenus(adminDashboardMenus)
    }
  }, [])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Menus.map((item, index) => {
            return (
              <DropdownMenuItem key={index} onClick={() => handleNavigation(item.href)}>
                <item.icon />
                <span>{item.title}</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={props.onLogout}>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
