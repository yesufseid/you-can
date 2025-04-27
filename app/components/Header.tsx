"use client"
import {
    AppBar,
    Typography,
  } from "@mui/material";
 
 import LinkButton from "./LinkButton";
 import { ThemeSwitcher } from "@/components/theme-switcher";
 import {useSelector } from "react-redux";
 import { RootState, AppDispatch } from "../Redux/store";
 import youcan from "../public/Image/youcan-white.svg"
 import Image from "next/image";
 import { useTheme } from "next-themes";
  export default function Headre() {
     const theme:any= useTheme();
    const isDark = theme.theme === "dark";
    const {count,filterd} = useSelector((state: RootState) => state.category);
    function calculateTotal(){
      let total = 0;
      for (const id in count) {
        const quantity = count[id];
        const mass = filterd.find((item) => item.id === id)?.mass || 0;
        total += quantity * mass;
      }
      return Number(total.toFixed(2))
    }
    
    return (
    
       <div className="grid grid-cols-12 gap-5 h-20 lg:mx-40">
           <div className="lg:col-span-5 col-span-4  flex justify-center lg:justify-center items-center ">
           <div className="text-red-500">
              {isDark?<Image 
                 src={youcan} 
                 alt="Youcan Logo" 
                  width={150} // adjust size if needed
                   height={50} 
                           />:<Image 
                           src={youcan} 
                           alt="Youcan Logo" 
                            width={150} // adjust size if needed
                             height={50} 
                             style={{filter:`invert(1)`, width: 150, height: 50 }}
                                     />}  
                    </div>
           </div>
           <div className="lg:col-span-7 col-span-8 flex justify-center gap-2 lg:gap-10  items-center" >
           <Typography 
  variant="h6" 
  sx={{ 
    fontWeight: "bold", 
    width: "100px", // or any width you prefer
    border: "1px solid", 
    borderRadius: "9999px", // full rounded
    textAlign: "center", // optional: to center the text inside
    padding: "8px" // optional: to give some space inside
  }}
>
  {calculateTotal()}g
</Typography>
               <ThemeSwitcher />
               <LinkButton   href={"#"} children={"useAI"} />
           </div>
       </div>
     
    )
  }
   