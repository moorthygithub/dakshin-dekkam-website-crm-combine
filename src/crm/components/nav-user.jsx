import ChangePassword from "@/crm/app/auth/ChangePassword";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/crm/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/crm/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/crm/components/ui/sidebar";
import useLogout from "@/hooks/useLogout";
import { setShowUpdateDialog } from "@/redux/slices/versionSlice";
import { ArrowRight, ChevronsUpDown, Key, LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function NavUser({ user }) {
  const [open, setOpen] = useState(false);

  const { isMobile } = useSidebar();
  const user_position = useSelector((state) => state.auth.user_position);
  const localVersion = useSelector((state) => state.auth?.version);
  const serverVersion = useSelector((state) => state?.version?.version);
  const sidebar = useSelector((state) => state.sidebar.open);
  const showDialog = localVersion !== serverVersion ? true : false;

  const dispatch = useDispatch();
  const handleOpenDialog = () => {
    dispatch(
      setShowUpdateDialog({
        showUpdateDialog: true,
        version: serverVersion,
      })
    );
  };
  const handleLogout = useLogout();

  const splitUser = user.name;
  const intialsChar = splitUser
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          {showDialog ? (
            <div
              className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground px-4 py-2 animate-pulse w-full cursor-pointer h-10"
              onClick={handleOpenDialog}
            >
              <div className="flex justify-center items-center h-full w-full text-xs leading-tight text-center">
                <span className="flex items-center gap-1 font-semibold">
                  New Updated : V{localVersion}
                  <ArrowRight className="w-4 h-4" />V{serverVersion}
                </span>
              </div>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/30"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      {intialsChar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user_position}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <SidebarMenuButton
                size="lg"
                className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0 cursor-text data-[state=open]: ${
                  sidebar ? "text-red-950" : "hidden"
                }`}
              >
                <div className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground px-4 py-2 w-full  h-10 ">
                  <div className="flex justify-between items-center h-full w-full text-xs leading-tight text-center">
                    <span className="flex items-center gap-1 font-semibold">
                      <span>
                        <span className="text-[10px]">V </span>
                        {localVersion}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      Updated on :15/10/2025
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        {intialsChar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Key />

                  <span className=" cursor-pointer">Change Password</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />

                  <span className=" cursor-pointer">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
      <ChangePassword setOpen={setOpen} open={open} />
    </>
  );
}
