"use client"
import {
    AppBar,
    Typography,
  } from "@mui/material";
 
 import LinkButton from "./LinkButton";
  export default function Headre() {
     
    return (
    
       <div className="grid grid-cols-12 gap-5 h-20">
           <div className="col-span-3 flex justify-end items-center ">
              <Typography variant="h6" sx={{ fontWeight: "bold" ,width:200 }}>
                        YOU-CAN
              </Typography>
           </div>
           <div className="col-span-9 flex justify-end gap-10  items-center" >
               <LinkButton   href={"#"} children={"useAI"} />
           </div>
       </div>
     
    )
  }
   