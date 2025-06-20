import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EachBlog {
  author: string;
  create_at: string;
  file_id: string;
  title: string;
  url: string;
  id : number;
}

interface BlogsInitialStateProps {
  blogsdata: EachBlog[];
  page: number;
}

const initialState: BlogsInitialStateProps = {
  blogsdata: [],
  page: 1,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<EachBlog[]>) => {
      state.blogsdata = action.payload;
    },
    addBlog: (state, action: PayloadAction<EachBlog>) => {
      state.blogsdata.unshift(action.payload);
    },
    addBlogsList: (
      state,
      action: PayloadAction<{ blogs: EachBlog[]; nextPage?: number }>
    ) => {
      state.blogsdata = [...state.blogsdata, ...action.payload.blogs];
      if (action.payload.nextPage) {
        state.page = action.payload.nextPage;
      } else {
        state.page += 1;
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearBlogs: (state) => {
      state.blogsdata = [];
      state.page = 1;
    },
  },
});

export const { setBlogs, addBlog, addBlogsList, clearBlogs, setPage } =
  blogsSlice.actions;

export default blogsSlice.reducer;
