
export interface MenuItem {
  name: string;
  price: number;
  image: string;
  description: string;
  link: string;
  review?: string;
  rating: number;
}
export const menuData = [
  {
    category: "burger",
  },
  {
    category: "biryani",
  },
  {
    category: "pizza",
  },
  {
    category: "sandwich",
  },
  {
    category: "drinks",
  },
];

import {
  faAddressBook,
  faClipboard,
  faListAlt,

} from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faUser,
  faFolderTree,
  faCircle,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

export const CardData = [
  {
    id: 1,
    icon: faClipboard,
    name: "My Order",
    link: "/active-orders",
  },
  {
    id: 2,
    icon: faListAlt, 
    name: "Order Detail",
  },
  {
    id: 3,
    icon: faUser,
    name: "Profile",
  },
  {
    id: 4,
    icon: faAddressBook,
    name: "Address",
  },
];
interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}
interface SidebarSubItem {
  title: string;
  link: string;
  icon: any;
}

interface SidebarItem {
  title: string;
  link: string;
  icon: any;
  subItems?: SidebarSubItem[];
}

export const sidebarItems: SidebarCategory[] = [
  {  
    category: "Users Management",
    items: [
      { title: "All Users", link: "/admin/users", icon: faUser },
    ],
  },
  {
    category: "Orders Management",
    items: [
      { title: "All Orders", link: "/admin/orders", icon: faFolderTree },
    ],
  },
  {
    category: "Product Management",
    items: [
      { title: "All Products", link: "/admin/product-listing", icon: faCircle },
    ],
  },
];

export const uncategorizedItems = [
  { title: "Dashboard", link: "/admin", icon: faHome },

];

