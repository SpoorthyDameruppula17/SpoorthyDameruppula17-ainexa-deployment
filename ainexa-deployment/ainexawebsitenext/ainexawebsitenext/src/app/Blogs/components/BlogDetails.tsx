import React ,{useEffect, useState} from "react";
import { getBlogDetails } from "../services/requests";
import Text from "../../../componets/Text";

interface blogContent {
    type :  keyof HTMLElementTagNameMap;
    text : string;
}

const BlogDetails = () =>{

    const [content , setContent] = useState<blogContent[] | null>(null);
    const loadata = async() =>{
        // const data = await getBlogDetails({blogName : blogName as string});
        // setContent(data.content);
    }
    useEffect(() =>{
        loadata();
    },[])
    return (
        <div style={{width : '100%' , height : '100%' , paddingTop : '8%'}}>
            {content &&  (
                content.map((item , index) =>{
                    return (
                        <Text text={item.text} tag={item.type} key={index}/>
                    )
                })
            )}
        </div>
    )
}

export default BlogDetails;