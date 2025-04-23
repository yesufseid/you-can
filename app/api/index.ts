"use server"
import { createClient } from '@/utils/supabase/server';


const getCategory=async()=>{
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("category").select("*")
    if (error) {
      console.error("Failed to get category:", error.message);
      return error;
    }
    console.log(data);
    return data;
}



 const createCategory= async (name:string,mass:number,image:string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("category").insert({name:name,mass:mass,image:image}).select();
  if (error) {
    console.error("Failed to insert category:", error.message);
    return error;
  }
  return data;
};

const uploadImage = async (file: File) => {
  const supabase = await createClient();
  const filePath = `youcan-${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from('youcan') // Your bucket name
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('you')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};


export {createCategory,getCategory,uploadImage}