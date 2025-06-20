import axios from "axios";
import { blogs_urls } from "./endpoints";
import { toast } from 'react-toastify';

export const getBlogsList = async ({ pageNumber }: { pageNumber: number }) => {
  try {

    const response = await axios.get(`${blogs_urls.Get_Blogs_list}?page=${pageNumber}`);
    if (response.status === 200) {
      return response.data || [];
    } else {
      toast.error('Failed to fetch blogs. Please try again.');
      console.log(response);
      return null;
    }
  } catch (error) {
    toast.error('Something went wrong while fetching the blogs.');
    console.log(error);
    return null;
  }
};

export const getBlogDetails = async({blogName} : {blogName : string}) =>{
    try {
      const response = await axios.get(`${blogs_urls.Get_Blogs_Details}?fileId=${blogName}`);
      if(response.status === 200){
        return response.data;
      }
      else {
        toast.error('Failed to fetch blogs. Please try again.');
        return null;
      }
    }
    catch{
        toast.error('Something went wrong while fetching the blogs.');
        return null;
    }
}