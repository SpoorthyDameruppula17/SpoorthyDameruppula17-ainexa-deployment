// src/pages/blogs.js
import React, { useEffect } from "react";
import "../../css/Blogs.css";
import Text from "@/componets/Text";
import { useDispatch, useSelector } from "react-redux";
import { addBlogsList , EachBlog } from "@/store/blogs";
import { getBlogsList } from "../services/requests";
import { useRouter } from "next/router";
import { RootState ,wrapper } from "@/store/store";
import Image from 'next/image';


const Blogs = ({ initialBlogs, page } : {initialBlogs : EachBlog[] ,page : number}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const blogs = useSelector((state: RootState) => state.blogs.blogsdata);

  useEffect(() => {
    if (blogs.length === 0 && initialBlogs) {
      dispatch(addBlogsList({ blogs: initialBlogs, nextPage: page }));
    }
  }, [blogs ,initialBlogs , dispatch , page ]);

  return (
    <div className="blogs-container">
      <div className="blogs-grid">
        {blogs.map((post, index) => (
          <div
            key={index}
            className="blog-card"
            onClick={() => router.push(`/blogDetails/${post.title}`)}
          >
            <Image
              src={post.url}
              alt={post.title}
              width={400}
              height={250}
              className="blog-image"
            />
            <div className="blog-content">
              <Text
                text={post.title}
                style={{ fontSize: "1.5rem", marginBottom: "1rem", display: "block" }}
              />
              <Text text={"Read More →"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;


export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      const page = store.getState().blogs.page || 1;
      const result = await getBlogsList({ pageNumber: page });

      return {
        props: {
          initialBlogs: result || [],
          page,
        },
      };
    }
);
