import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/crm/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/crm/components/ui/sidebar";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

// const itemVariants = {
//   open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
//   closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
// };

// const buttonVariants = {
//   hover: { scale: 1.05 },
// };

// export function NavMain({ items }) {
//   const location = useLocation();
//   const [openItem, setOpenItem] = React.useState(null);

//   const handleLinkClick = () => {
//     const sidebarContent = document.querySelector(".sidebar-content");
//     if (sidebarContent) {
//       sessionStorage.setItem("sidebarScrollPosition", sidebarContent.scrollTop);
//     }
//   };

//   React.useEffect(() => {
//     const sidebarContent = document.querySelector(".sidebar-content");
//     const scrollPosition = sessionStorage.getItem("sidebarScrollPosition");

//     if (sidebarContent && scrollPosition) {
//       sidebarContent.scrollTop = parseInt(scrollPosition);
//     }
//   }, [location.pathname]);

//   if (!items || items.length === 0) {
//     return null;
//   }

//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Home</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => {
//           const renderItem = (item, depth = 0) => {
//             const hasSubItems = item.items && item.items.length > 0;
//             const isItemActive = location.pathname === item.url;
//             const isParentActive = hasSubItems
//               ? item.items.some((sub) =>
//                   sub.items?.length
//                     ? sub.items.some(
//                         (deepSub) => deepSub.url === location.pathname
//                       )
//                     : sub.url === location.pathname
//                 )
//               : isItemActive;

//             if (!hasSubItems) {
//               return (
//                 <SidebarMenuItem key={item.title}>
//                   <Link to={item.url} onClick={handleLinkClick}>
//                     <motion.div variants={buttonVariants} whileHover="hover">
//                       <SidebarMenuButton tooltip={item.title}>
//                         {item.icon && <item.icon />}
//                         <span
//                           className={`transition-colors duration-200 ${
//                             isItemActive
//                               ? "text-blue-500"
//                               : "hover:text-blue-500"
//                           }`}
//                         >
//                           {item.title}
//                         </span>
//                       </SidebarMenuButton>
//                     </motion.div>
//                   </Link>
//                 </SidebarMenuItem>
//               );
//             }

//             return (
//               <Collapsible
//                 key={item.title}
//                 asChild
//                 open={openItem == item.title || isParentActive}
//                 onOpenChange={(isOpen) =>
//                   setOpenItem(isOpen ? item.title : null)
//                 }
//                 // defaultOpen={isParentActive}
//                 className="group/collapsible"
//               >
//                 <SidebarMenuItem>
//                   <CollapsibleTrigger asChild>
//                     <motion.div variants={buttonVariants} whileHover="hover">
//                       <SidebarMenuButton tooltip={item.title}>
//                         {item.icon && <item.icon />}
//                         <span
//                           className={`transition-colors duration-200 ${
//                             isParentActive
//                               ? "text-blue-500"
//                               : "hover:text-blue-500"
//                           }`}
//                         >
//                           {item.title}
//                         </span>
//                         <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                       </SidebarMenuButton>
//                     </motion.div>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent
//                     as={motion.div}
//                     variants={itemVariants}
//                     initial="closed"
//                     animate={
//                       openItem == item.title || isParentActive
//                         ? "open"
//                         : "closed"
//                     }
//                     // animate={isParentActive ? "open" : "closed"}
//                   >
//                     <SidebarMenuSub
//                       className={`border-l border-blue-500 pl-${depth + 2}`}
//                     >
//                       {item.items.map((sub) => renderItem(sub, depth + 1))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </SidebarMenuItem>
//               </Collapsible>
//             );
//           };

//           return renderItem(item);
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
export function NavMain({ items }) {
  const location = useLocation();

  const handleLinkClick = () => {
    const sidebarContent = document.querySelector(".sidebar-content");
    if (sidebarContent) {
      sessionStorage.setItem("sidebarScrollPosition", sidebarContent.scrollTop);
    }
  };

  React.useEffect(() => {
    const sidebarContent = document.querySelector(".sidebar-content");
    const scrollPosition = sessionStorage.getItem("sidebarScrollPosition");

    if (sidebarContent && scrollPosition) {
      sidebarContent.scrollTop = parseInt(scrollPosition);
    }
  }, [location.pathname]);

  if (!items || items.length === 0) return null;

  const renderItem = (item, depth = 0) => {
    const hasSubItems = item.items && item.items.length > 0;
    const isItemActive = location.pathname === item.url;

    if (!hasSubItems) {
      return (
        <SidebarMenuItem key={item.title}>
          <Link to={item.url} onClick={handleLinkClick}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span
                className={`transition-colors duration-200 ${
                  isItemActive ? "text-blue-500" : "hover:text-blue-500"
                }`}
              >
                {item.title}
              </span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      );
    }

    // Always open: remove Collapsible and render submenu directly
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton tooltip={item.title}>
          {item.icon && <item.icon />}
          <span className="text-blue-500">{item.title}</span>
        </SidebarMenuButton>
        <SidebarMenuSub className={`border-l border-blue-500 pl-${depth + 2}`}>
          {item.items.map((sub) => renderItem(sub, depth + 1))}
        </SidebarMenuSub>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Home</SidebarGroupLabel>
      <SidebarMenu>{items.map((item) => renderItem(item))}</SidebarMenu>
    </SidebarGroup>
  );
}
