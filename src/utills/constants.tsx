// export const MenuList = [
//   {
//     name: "Set Menu",
//     price: 100,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "/profile/Setmenu",
//     addOns: [
//       { name: "Coke", price: 2 },
//       { name: "Water", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },
//   {
//     name: "Hot Items",
//     price: 200,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "#",
//     addOns: [
//       { name: "Chese", price: 2 },
//       { name: "Juice", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },
//   {
//     name: "Biryani",
//     price: 300,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "#",
//     addOns: [
//       { name: "Coke", price: 2 },
//       { name: "Water", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },
//   {
//     name: "Drinks",
//     price: 400,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "#",
//     addOns: [
//       { name: "sprite", price: 2 },
//       { name: "Water", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },
//   {
//     name: "Pizza",
//     price: 500,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "#",
//     addOns: [
//       { name: "Extra spice", price: 2 },
//       { name: "Rice", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },
//   {
//     name: "Sandwich",
//     price: 600,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "#",
//     addOns: [
//       { name: "Juice", price: 2 },
//       { name: "Water", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },
//   {
//     name: "Burger",
//     price: 300,
//     image: "/images/burger.jpeg", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "#",
//     addOns: [
//       { name: "Chese", price: 2 },
//       { name: "Water", price: 1 },
//     ],
//     funOptions: [
//       { name: "Fun Option 1", price: 1 },
//       { name: "Fun Option 2", price: 2 },
//     ],
//   },

//   // Add more menu items as needed
// ];
// export const cardList = [
//   {
//     name: "Today Top Picks",
//     price: 100,
//     image: "/images/c3.png", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "/",
//   },
//   {
//     name: "Suggestions",
//     price: 200,
//     image: "/images/c2.png", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "/suggestions",
//   },
//   {
//     name: "Favourites",
//     price: 300,
//     image: "/images/c1.png", 
//     description: "Delicious zinger burger with crispy chicken patty.",
//     link: "/favorite",
//   },
// ];

export interface MenuItem {
  name: string;
  price: number;
  image: string;
  description: string;
  link: string;
  review?: string; // Optional field
  rating: number;
}
export const menuData = [
  {
    category: "burger",
    // image: "/images/burger.jpg",
    // items: [
    //   {
    //     name: "Cheese Burger",
    //     price: 100,
    //     image: "/images/b1.jpg",
    //     description: "Juicy beef patty with melted cheese in a soft bun.",
    //     link: "#",
    //     review: "Deliciously cheesy!",
    //     rating: 0,
    //   },
    //   {
    //     name: "Zinger Burger",
    //     price: 95,
    //     image: "/images/b2.jpg",
    //     description: "Crispy chicken with a spicy kick.",
    //     link: "#",
    //     review: "Spicy and crispy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Chicken Burger",
    //     price: 90,
    //     image: "/images/b4.jpg",
    //     description: "Tender chicken patty with fresh toppings.",
    //     link: "#",
    //     review: "Tender and tasty.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Patty Burger",
    //     price: 85,
    //     image: "/images/b3.jpg",
    //     description: "Beef patty with classic toppings.",
    //     link: "#",
    //     review: "Classic and satisfying.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Grill Burger",
    //     price: 110,
    //     image: "/images/b5.jpg",
    //     description: "Grilled beef patty with smoky flavor.",
    //     link: "#",
    //     review: "Smoky and grilled.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Mity Burger",
    //     price: 105,
    //     image: "/images/b6.jpg",
    //     description: "Hearty burger with extra cheese.",
    //     link: "#",
    //     review: "Cheesy and hearty.",
    //     rating: 0,
    //   },
    // ],
  },
  {
    category: "biryani",
    // image: "/images/biryani.jpg",
    // items: [
    //   {
    //     name: "Chicken Biryani",
    //     price: 120,
    //     image: "/images/br1.jpg",
    //     description: "Aromatic rice dish with tender chicken pieces.",
    //     link: "#",
    //     review: "Spiced and tender.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Mutton Biryani",
    //     price: 130,
    //     image: "/images/br3.jpg",
    //     description: "Rich and flavorful mutton biryani.",
    //     link: "#",
    //     review: "Rich and flavorful.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Bombay Biryani",
    //     price: 140,
    //     image: "/images/br4.jpg",
    //     description: "Spicy and aromatic rice dish.",
    //     link: "#",
    //     review: "Spicy and aromatic.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Fish Biryani",
    //     price: 125,
    //     image: "/images/br5.jpg",
    //     description: "Delicious biryani with tender fish pieces.",
    //     link: "#",
    //     review: "Tender and flavorful.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Nali Biryani",
    //     price: 135,
    //     image: "/images/br6.jpg",
    //     description: "Hearty biryani with succulent nali pieces.",
    //     link: "#",
    //     review: "Hearty and succulent.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Hyderabadi Biryani",
    //     price: 140,
    //     image: "/images/br7.jpg",
    //     description: "Traditional biryani with spices and herbs.",
    //     link: "#",
    //     review: "Traditional and spicy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Lahori Biryani",
    //     price: 130,
    //     image: "/images/br8.jpg",
    //     description: "Rich biryani with unique Lahori spices.",
    //     link: "#",
    //     review: "Rich and unique.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Matka Biryani",
    //     price: 150,
    //     image: "/images/br9.jpg",
    //     description: "Biryani cooked in a traditional matka.",
    //     link: "#",
    //     review: "Traditional and rich.",
    //     rating: 0,
    //   },
    // ],
  },
  {
    category: "pizza",
    // image: "/images/pizza.jpg",
    // items: [
    //   {
    //     name: "Margherita Pizza",
    //     price: 220,
    //     image: "/images/p1.jpg",
    //     description: "Classic Margherita with fresh mozzarella and basil.",
    //     link: "#",
    //     review: "Classic and fresh.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Pepperoni Pizza",
    //     price: 250,
    //     image: "/images/p2.jpg",
    //     description: "Spicy pepperoni with mozzarella cheese.",
    //     link: "#",
    //     review: "Spicy and cheesy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "BBQ Chicken Pizza",
    //     price: 270,
    //     image: "/images/p3.jpg",
    //     description: "Grilled chicken with BBQ sauce and onions.",
    //     link: "#",
    //     review: "BBQ and grilled.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Veggie Pizza",
    //     price: 230,
    //     image: "/images/p4.jpg",
    //     description: "Loaded with bell peppers, olives, and mushrooms.",
    //     link: "#",
    //     review: "Veggie loaded.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Hawaiian Pizza",
    //     price: 240,
    //     image: "/images/p5.jpg",
    //     description: "Ham and pineapple on a cheesy base.",
    //     link: "#",
    //     review: "Sweet and savory.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Buffalo Chicken Pizza",
    //     price: 260,
    //     image: "/images/p6.jpg",
    //     description: "Buffalo chicken with blue cheese dressing.",
    //     link: "#",
    //     review: "Buffalo and cheesy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Four Cheese Pizza",
    //     price: 280,
    //     image: "/images/p7.jpg",
    //     description: "Blend of mozzarella, cheddar, parmesan, and blue cheese.",
    //     link: "#",
    //     review: "Four cheese delight.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Meat Lovers Pizza",
    //     price: 320,
    //     image: "/images/p8.jpg",
    //     description: "Pepperoni, sausage, ham, and bacon.",
    //     link: "#",
    //     review: "Meaty and hearty.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Supreme Pizza",
    //     price: 300,
    //     image: "/images/p9.jpg",
    //     description: "Combination of meat, veggies, and cheese.",
    //     link: "#",
    //     review: "Supreme and flavorful.",
    //     rating: 0,
    //   },
    // ],
  },
  {
    category: "sandwich",
    // image: "/images/sandwich.jpg",
    // items: [
    //   {
    //     name: "Club Sandwich",
    //     price: 90,
    //     image: "/images/sa1.jpg",
    //     description: "Triple-layered sandwich with ham, cheese, and veggies.",
    //     link: "#",
    //     review: "Layered and filling.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Turkey Sandwich",
    //     price: 85,
    //     image: "/images/sa2.jpg",
    //     description: "Turkey breast with lettuce and tomato.",
    //     link: "#",
    //     review: "Turkey and fresh.",
    //     rating: 0,
    //   },
    //   {
    //     name: "BLT Sandwich",
    //     price: 80,
    //     image: "/images/sa3.jpg",
    //     description: "Bacon, lettuce, and tomato with mayo.",
    //     link: "#",
    //     review: "Bacon and crispy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Cheese Sandwich",
    //     price: 75,
    //     image: "/images/sa4.jpg",
    //     description: "Classic ham and cheese on whole wheat.",
    //     link: "#",
    //     review: "Classic and simple.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Chicken Salad Sandwich",
    //     price: 90,
    //     image: "/images/sa5.jpg",
    //     description: "Chicken salad with celery and grapes.",
    //     link: "#",
    //     review: "Salad and creamy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Tuna Sandwich",
    //     price: 85,
    //     image: "/images/sa6.jpg",
    //     description: "Tuna salad with lettuce and tomato.",
    //     link: "#",
    //     review: "Tuna and fresh.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Veggie Sandwich",
    //     price: 80,
    //     image: "/images/sa7.jpg",
    //     description: "Cucumber, tomato, and avocado on multigrain.",
    //     link: "#",
    //     review: "Veggie and light.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Egg Salad Sandwich",
    //     price: 85,
    //     image: "/images/sa8.jpg",
    //     description: "Creamy egg salad with a hint of mustard.",
    //     link: "#",
    //     review: "Creamy and tangy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Roast Beef Sandwich",
    //     price: 100,
    //     image: "/images/sa9.jpg",
    //     description: "Roast beef with horseradish sauce.",
    //     link: "#",
    //     review: "Beefy and rich.",
    //     rating: 0,
    //   },
    // ],
  },
  {
    category: "drinks",
    // image: "/images/drink.jpg",
    // items: [
    //   {
    //     name: "Lemonade",
    //     price: 55,
    //     image: "/images/d1.jpg",
    //     description: "Refreshing lemonade with a hint of mint.",
    //     link: "#",
    //     review: "Minty and refreshing.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Iced Tea",
    //     price: 50,
    //     image: "/images/d2.jpg",
    //     description: "Chilled iced tea with lemon.",
    //     link: "#",
    //     review: "Cool and zesty.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Cola",
    //     price: 45,
    //     image: "/images/d3.jpg",
    //     description: "Classic cola with a fizzy kick.",
    //     link: "#",
    //     review: "Fizzy and classic.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Orange Juice",
    //     price: 60,
    //     image: "/images/d4.jpg",
    //     description: "Freshly squeezed orange juice.",
    //     link: "#",
    //     review: "Fresh and tangy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Milkshake",
    //     price: 65,
    //     image: "/images/d5.jpg",
    //     description: "Creamy milkshake in vanilla, chocolate, or strawberry.",
    //     link: "#",
    //     review: "Creamy and rich.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Smoothie",
    //     price: 75,
    //     image: "/images/d6.jpg",
    //     description: "Blended fruit smoothie with yogurt.",
    //     link: "#",
    //     review: "Fruity and smooth.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Hot Chocolate",
    //     price: 55,
    //     image: "/images/d7.jpg",
    //     description: "Rich hot chocolate with whipped cream.",
    //     link: "#",
    //     review: "Rich and creamy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Cappuccino",
    //     price: 65,
    //     image: "/images/d8.jpg",
    //     description: "Espresso with steamed milk and foam.",
    //     link: "#",
    //     review: "Espresso and frothy.",
    //     rating: 0,
    //   },
    //   {
    //     name: "Latte",
    //     price: 70,
    //     image: "/images/d9.jpg",
    //     description: "Smooth espresso with steamed milk.",
    //     link: "#",
    //     review: "Smooth and creamy.",
    //     rating: 0,
    //   },
    // ],
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
  faPlusCircle,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";

export const CardData = [
  {
    id: 1,
    icon: faClipboard, // Replace with your desired icon
    name: "My Order",
    link: "/active-orders",
  },
  {
    id: 2,
    icon: faListAlt, // Replace with your desired icon
    name: "Order Detail",
  },
  {
    id: 3,
    icon: faUser, // Replace with your desired icon
    name: "Profile",
  },
  {
    id: 4,
    icon: faAddressBook, // Replace with your desired icon
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
      { title: "Product Reviews", link: "/admin/product-reviews", icon: faStarHalfAlt },
    ],
  },
  // Add more categories and items as needed
];

export const uncategorizedItems = [
  { title: "Dashboard", link: "/admin", icon: faHome },

];

