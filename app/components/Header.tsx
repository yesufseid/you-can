"use client"
import {
    Typography,
  } from "@mui/material";
 
import { useRouter } from 'next/navigation'
 import LinkButton from "./LinkButton";
 import { ThemeSwitcher } from "@/components/theme-switcher";
 import {useSelector } from "react-redux";
 import { RootState} from "../Redux/store";
 import youcan from "../public/Image/youcan-white.svg"
 import Image from "next/image";
 import { useTheme } from "next-themes";
  export default function Headre() {
    const router = useRouter()
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
    
       <div className="grid grid-cols-12 gap-5 h-20 lg:mx-40  bg-white dark:bg-neutral-950 sticky top-0 z-50">
           <div className="lg:col-span-5 col-span-4  flex justify-center lg:justify-center items-center ">
           <div className="text-red-500 cursor-pointer">
              {isDark?<Image 
                 src={youcan} 
                 alt="Youcan Logo" 
                  width={150} // adjust size if needed
                   height={50} 
                   onClick={() => router.push('/')}
                           />:<Image 
                           src={youcan} 
                           alt="Youcan Logo" 
                            width={150} // adjust size if needed
                             height={50} 
                             style={{filter:`invert(1)`, width: 150, height: 50 }}
                             onClick={() => router.push('/')}
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
               <LinkButton   href={"/ai"} children={"useAI"} />
           </div>
       </div>
     
    )
  }
   