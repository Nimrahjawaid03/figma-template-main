'use client'

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



import { IoShareSocialOutline } from "react-icons/io5";
import { VscArrowSwap } from "react-icons/vsc";
import { IoHeartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { FaStar } from "react-icons/fa";
import { Input } from "@/components/ui/input";


import { main, section } from "framer-motion/client";

import SecThree from "@/app/productOne/page";

interface Product {
  id: number;
  img: string;
  title: string;
  rating: number;
  price: string;
  originalPrice?: string;
  discount?: string;
  description: string;
  
}

const Filters = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null); // Track the selected color

  const colors = [
    'darkblue', 'red', 'green', 'yellow', 'purple', 
    'pink', 'orange', 'brown', 'blue', 'black'
  ];

  // Function to handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color); // Set the selected color when clicked
  };

  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Track selected size
  const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"]; // Size options

  // Function to handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size); // Set the selected size on click
  };
  const styles = ["Casual", "Formal" , "Party" , "Gym"];

   // State to manage the selected price value
   const [price, setPrice] = useState(125); // Initial value set to 125

   // Handle change in range input value
   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setPrice(Number(e.target.value)); // Update price state with new value
   };

 // Simple state to show button click effect
 const [filterApplied, setFilterApplied] = useState(false);

 // Simple apply filter function
 const handleApplyFilter = () => {
   setFilterApplied(true);
   alert("Filter applied!");

   // Hide the success message after 3 seconds
   setTimeout(() => {
     setFilterApplied(false);
   }, 3000); // 3000 ms = 3 seconds
 };

  return (
    <div className="w-full md:w-64 bg-white rounded-md border border-gray-300 p-4 space-y-6 mt-[10px] md:ml-auto">
  <h2 className="text-xl font-bold mb-[30px] border-b-2 flex items-center justify-between pb-2">
    Filters
    <Image src={"/Frame (11).png"} width={24} height={24} alt="" />
  </h2>

  {/* Categories */}
  <div>
    <ul className="space-y-2 border-b-2 pb-2 mb-4">
      {["T-shirts", "Shorts", "Shirts", "Hoodies", "Jeans"].map((category) => (
        <li key={category} className="flex items-center justify-between">
          <button className="text-gray-700 hover:underline">{category}</button>
          <Image src={"/Frame (13).png"} width={16} height={16} alt="" />
        </li>
      ))}
    </ul>
  </div>

  <div>
      <h3 className="text-lg font-semibold flex items-center pb-2 mb-4">
        Price
        <Image src="/Frame (12).png" width={16} height={16} alt="" className="ml-auto" />
      </h3>

      <div className="flex items-center space-x-2 border-b-2 pb-2 mb-4 bg-white p-2 rounded-lg">
        <span>${50}</span>
        <input
          type="range"
          min="50"
          max="200"
          value={price} // Set value to the state variable
          onChange={handlePriceChange} // Update value on change
          className="w-full h-[8px] bg-black rounded-lg appearance-none focus:outline-none" // Tailwind classes for the slider
        />
        <span>${200}</span>
      </div>

      {/* Display the selected price value */}
      <div className="text-center mt-2 text-gray-700">
        <p>Selected Price: ${price}</p>
      </div>
    </div>

       {/* Colors */}
      <div>
      <h3 className="text-lg font-semibold flex items-center pb-2 mb-4">
        Colors
        <Image src={"/Frame (12).png"} width={16} height={16} alt="" className="ml-auto" />
      </h3>
      
      <div className="flex flex-wrap gap-4 mb-4">
        {colors.slice(0, 5).map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="w-6 h-6 rounded-full border relative flex items-center justify-center"
            onClick={() => handleColorSelect(color)} // Set the selected color on click
          >
            {selectedColor === color && ( // Display tick mark if this color is selected
              <Image
                src="/Frame (14).png"
                alt="Tick"
                width={12}
                height={12}
                className="absolute"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {colors.slice(5).map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="w-6 h-6 rounded-full border relative flex items-center justify-center"
            onClick={() => handleColorSelect(color)} // Set the selected color on click
          >
            {selectedColor === color && ( // Display tick mark if this color is selected
              <Image
                src="/Frame (14).png"
                alt="Tick"
                width={12}
                height={12}
                className="absolute"
              />
            )}
          </button>
        ))}
      </div>
    </div>

  {/* Sizes */}
  <div>
      <h3 className="text-lg font-semibold flex items-center pb-2 mb-4">
        Size
        <Image src={"/Frame (12).png"} width={16} height={16} alt="" className="ml-auto" />
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)} // Set the clicked size
            className={`border px-4 py-2 text-sm rounded-full ${
              selectedSize === size ? "bg-black text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>

  {/* Dress Style */}
  <div>
    <h3 className="text-lg font-semibold flex items-center pb-2 mb-4">
      Dress Style
      <Image src={"/Frame (12).png"} width={16} height={16} alt="" className="ml-auto" />
    </h3>
    <div className="space-y-2 pb-2 mb-4">
      {styles.map((style) => (
        <div key={style} className="flex items-center justify-between">
          <button className="text-gray-700 hover:underline">{style}</button>
          <Image src={"/Frame (13).png"} width={16} height={16} alt="" />
        </div>
      ))}
    </div>

    {/* Apply Filter Button */}
    <div className="flex justify-center">
        <button
          className="text-white bg-black rounded-full w-full md:w-[247px] h-[48px] border border-gray-300 mb-[10px]"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </button>
      </div>

      {/* Feedback for filter applied */}
      {filterApplied && (
        <div className="mt-4 text-center text-green-500">
          Filters have been applied successfully!
        </div>
      )}
  </div>
</div>

  
  )
}  

export default function Casual() {
   const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const data = await client.fetch(
            `*[_type=="products"][0..8]{
              _id,
              name,
              description,
              price,
              "imageUrl" : image.asset->url,
              category,
              discountPercent,
              "isNew": new,
              colors,
              sizes,
              rating
            }`
          );
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };      fetchProducts();
    }, []);

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to toggle the Shop dropdown
  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };
  
  return (
    <div>
    {/* Sticky Announcement Section */}
<header>
  <div className="w-full h-[38px] flex items-center justify-between bg-[#000000] text-[#FFFFFF] font-integral px-[20px] sm:px-[55px] sticky top-0 z-10">
    {/* Text and Sign-Up Link */}
    <div className="flex items-center justify-between w-full sm:w-auto">
      <span className="text-xs sm:text-base text-center sm:text-left sm:ml-[400px] w-full sm:w-auto">
        Sign up and get 20% off your first order.
      </span>

      <div className="flex items-center mt-0 sm:mt-0 space-x-2 sm:space-x-3">
        {/* Sign Up Now with Icon in One Line */}
        <div className="flex items-center ml-3">
        <Link href="/component/authentication"> <span className="mr-3 underline whitespace-nowrap">Sign Up Now</span></Link>
          <Image
            src="/Vector (2).png"
            alt="arrow"
            width={20}
            height={20}
            className="ml-10"
          />
        </div>
      </div>
    </div>
  </div>


        {/* Navigation Section */}
        <div className="flex items-center justify-between px-[20px] sm:px-[100px] py-4 bg-white">
          {/* Logo */}
          <div>
            <Image src="/SHOP.CO.png" alt="Logo" width={141} height={22} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-x-12">
            <li>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent className="w-[300px] py-2 px-4 bg-white shadow-lg rounded-lg">
              {/* Link for Mens */}
              <NavigationMenuLink className="font-bold text-black block mb-2">
                <Link href="/comp/mens-clothes">Mens-Clothes</Link>
              </NavigationMenuLink>
              {/* Line break added */}
              <br />
              {/* Link for Casual */}
              <NavigationMenuLink className="font-bold text-black block mb-2">
                <Link href="/comp/casual-clothes">Casual</Link>
              </NavigationMenuLink>
              {/* Line break added */}
              <br />
              {/* Link for Cart */}
              <NavigationMenuLink className="font-bold text-black block">
                <Link href="/comp/cart">Cart</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </li>

   
              <li>
                <Link href="/" className="hover:underline whitespace-nowrap">
                  On Sale
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline whitespace-nowrap">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline whitespace-nowrap mr-3">
                  Brands
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right-Side Elements */}
          <div className="flex ml-3 items-center gap-x-6">
            {/* Search Bar */}
            <div className="relative">
              <Image src="/Frame 3.png" alt="Search Icon" width={477} height={48} />
            </div>

           {/* Cart Icon */}
<Link href="/comp/cart">
  <Image
    src="/Frame (3).png"
    alt="Cart"
    width={24}
    height={24}
    className="cursor-pointer"
  />
</Link>
            
          </div>

           {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center ml-4">
        <button onClick={toggleMenu}>
          <div className="w-6 h-6 flex flex-col justify-between items-center space-y-1">
            <div className="w-6 h-1 bg-black"></div>
            <div className="w-6 h-1 bg-black"></div>
            <div className="w-6 h-1 bg-black"></div>
          </div>
        </button>
      </div>
      </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white px-[20px] py-4">
          <ul>
            <li className="py-2">
              <button onClick={toggleShop} className="block hover:underline w-full text-left">
                Shop
              </button>
              {isShopOpen && (
                <ul className="pl-4">
                  <li className="py-2">
                    <Link href="/comp/mens-clothes" className="block hover:underline">
                      Mens
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/comp/casual" className="block hover:underline">
                      Casual
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/comp/cart" className="block hover:underline">
                      Cart
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="py-2">
              <Link href="/" className="block hover:underline">
                On Sale
              </Link>
            </li>
            <li className="py-2">
              <Link href="/" className="block hover:underline">
                New Arrivals
              </Link>
            </li>
            <li className="py-2">
              <Link href="/" className="block hover:underline">
                Brands
              </Link>
            </li>
          </ul>
        </div>
      )}

{/* Breadcrumb Section */}
        <Breadcrumb className="mt-5 ml-[95px]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Casual</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <main className="flex flex-col md:flex-row">
  {/* Filter Menu */}
  <aside className="md:w-1/4 p-4 mb-4 md:mb-0">
    <Filters />
  </aside>
 

  {/* Main Content */}
  <div className="flex-grow p-4 md:p-8">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6">
      <h1 className="text-2xl font-bold mb-4 md:mb-0 text-center md:text-left">Casual</h1>
      <div className="text-sm text-gray-500 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
        <span className="mb-2 md:mb-0 text-center">Showing 1-10 of 100 Products</span>
        <span className="flex items-center justify-center">
          Sort by:
          <NavigationMenu className="inline-block text-black ml-2">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Most Popular</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Add dropdown content here */}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </span>
      </div>
    </div>

    <div className="container px-5 py-16 mx-auto">
  {loading ? (
    <div className="flex flex-col gap-4 items-center justify-center h-[80vh]">
      <p className="text-2xl font-bold tracking-wider text-blue-600">Loading Products...</p>
      <div className="w-32 h-32 rounded-full border-t border-blue-600 animate-spin"></div>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product: any) => (
        <div key={product._id} className="relative group">
          <a className="block relative h-[301px] w-full overflow-hidden">
            <Image
              alt={product.name}
              className="object-cover object-center w-full h-full block"
              src={product.imageUrl}
              width={285}
              height={301}
            />
          </a>
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <h2 className="text-white text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-white text-sm text-center mb-4 line-clamp-2">
              {product.description}
            </p>
            <Link href={`/productFour/${product._id}`}>
              <button className="bg-[#B88E2F] text-black px-6 py-2 font-semibold hover:bg-[#A67C2A] transition-colors duration-300">
                View Detail
              </button>
            </Link>
          </div>
          <div className=" p-4">
            <h2 className="text-gray-900 title-font text-lg font-bold">{product.name}</h2>
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {product.category}
            </h3>
            <div className="flex items-center mt-1">
  {[...Array(5)].map((_, i) => (
    <FaStar
      key={i}
      className="h-4 w-4 text-yellow-500"
    />
  ))}
</div>

            <p className="mt-1 flex items-center gap-2 text-black font-semibold">
              ${product.price}
              {product.discountPercent && (
                <span className="text-gray-500 line-through">${(product.price / (1 - product.discountPercent / 100)).toFixed(2)}</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

            {/* Border after the product grid */}
  <div className="border-t-2 border-gray-300 mt-8 pt-4"></div>
         </div>

         </main>
 
{/* Pagination Section */}
<div className="flex justify-center items-center w-full mt-8 pt-4 px-4 sm:px-6 md:px-8 lg:px-12 space-x-4 md:space-x-5 mb-12">
  {/* Previous Button */}
  <Link href="/comp/mens-clothes"> {/* Link to Mens Clothes or Home Page */}
    <button className="rounded-full border-2 border-gray-100 text-black w-[110px] h-[36px] flex items-center justify-center gap-2">
      <Image src="/arrow-left.png" width={20} height={20} alt="Previous" />
      Previous
    </button>
  </Link>

  {/* Pagination Numbers */}
  <div className="flex items-center space-x-3">
    {/* Active Page */}
    <span className="bg-gray-300 text-black w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold cursor-pointer">
      1
    </span>

    {/* Page Numbers */}
    <span className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300">2</span>
    <span className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300">3</span>

    {/* Ellipsis for skipped pages */}
    <span className="text-gray-500">...</span>

    {/* More Page Numbers */}
    <span className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300">8</span>
    <span className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300">9</span>
    <span className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300">10</span>
  </div>

  {/* Next Button */}
  <Link href="/comp/cart"> {/* Link to Cart page */}
    <button className="rounded-full border-2 border-gray-100 text-black w-[110px] h-[36px] flex items-center justify-center gap-2">
      Next
      <Image src="/arrow-right.png" width={20} height={20} alt="Next" />
    </button>
  </Link>
</div>

  
 {/* Newsletter Signup Section */}
      <div className="mb-[1px] w-full mr-[50px] bg-black rounded-lg py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Text Section */}
        <div className="text-left text-white mb-4 md:mb-0">
          <span className="text-3xl font-extrabold block mb-4">
            STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
          </span>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end space-y-4 w-full md:w-auto">
          {/* Email Input Section */}
          <div className="relative w-full md:w-[349px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Image src="/Frame (8).png" width={24} height={24} alt="Newsletter Icon" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="w-full h-[48px] pl-12 rounded-lg border-none"
            />
          </div>

          {/* Box Section */}
          <div className="relative w-full md:w-[349px] h-[48px] bg-white rounded-lg flex items-center pl-3">
            <span className="ml-12 text-black font-medium">
              Subscribe to Newsletter
            </span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-gray-600 body-font bg-gray-100">
        <div className="container border-b-2 border-gray-300 px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <span className="text-3xl text-black font-extrabold mb-[10px]">SHOP.CO</span>
            <p className="mt-2 text-sm text-gray-500 mb-10">
            We have clothes that suit your style and which you&#39;re proud to wear. From women to men.

            </p>
          </div>

          {/* Footer Links Section */}
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            {/* Company Links */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-lg mb-3">
                Company
              </h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-gray-800 mb-4">About</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Features</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Works</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Career</li>
              </nav>
            </div>

            {/* Help Links */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-lg mb-3">
                Help
              </h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-gray-800 mb-4">Customer Support</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Delivery Details</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Terms & Conditions</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Privacy Policy</li>
              </nav>
            </div>

            {/* FAQ Links */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-lg mb-3">
                FAQ
              </h2>
              <nav className="list-none mb-10">
                <li className="text-gray-600 hover:text-gray-800 mb-4">Account</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Manage Deliveries</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Orders</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Payments</li>
              </nav>
            </div>

            {/* Resources Links */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black tracking-widest text-lg mb-3">
                Resources
              </h2>
              <nav className="list-none mb-10 ">
                <li className="text-gray-600 hover:text-gray-800 mb-4">Free eBooks</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Development Tutorial</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">How to - Blog</li>
                <li className="text-gray-600 hover:text-gray-800 mb-4">Youtube Playlist</li>
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap items-center justify-between">
            {/* Footer Text */}
            <p className="text-gray-500 text-sm text-center sm:text-left">
              Shop.co © 2000-2023, All Rights Reserved
            </p>

            {/* Footer Images */}
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <Image src="/Badge.png" width={46.61} height={30.03} alt="Badge 1" />
              <Image src="/Badge (1).png" width={46.61} height={30.03} alt="Badge 2" />
              <Image src="/Badge (2).png" width={46.61} height={30.03} alt="Badge 3" />
              <Image src="/Badge (3).png" width={46.61} height={30.03} alt="Badge 4" />
              <Image src="/Badge (4).png" width={46.61} height={30.03} alt="Badge 5" />
            </div>
          </div>
        </div>
      </footer>

   
    </div>



  );
}
