import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState
} from "@reduxjs/toolkit";
import http from "utils/http";
import { IPost } from "./../../types/blog.type";
import { RootState } from "store";
import { initalPostList2 } from "pages/constants/blog";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FullfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

interface BlogState {
  isLoading: boolean;
  postList: EntityState<IPost, string>;
  postEdit: IPost | null;
}

export const postsAdapter = createEntityAdapter({
  selectId: (post: IPost) => post.id
  // Keep the "all IDs" array sorted based on book titles
  // sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = postsAdapter.getInitialState({
  isLoading: false,
  postEdit: null
});

export const getListBlog = createAsyncThunk(
  "blog/getPostList",
  async (_, thunkAPI) => {
    const response = await http.get<IPost[]>("/posts", {
      signal: thunkAPI.signal
    });

    return response.data;
  }
);

export const addPost = createAsyncThunk(
  "blog/addPost",
  async (body: Omit<IPost, "id">, thunkAPI) => {
    const response = await http.post<IPost>("/posts", body, {
      signal: thunkAPI.signal
    });
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "blog/updatePost",
  async ({ idPost, body }: { idPost: string; body: IPost }, thunkAPI) => {
    const response = await http.put<IPost>(`posts/${idPost}`, body, {
      signal: thunkAPI.signal
    });
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (idPost: string, thunkAPI) => {
    const response = await http.delete<IPost>(`posts/${idPost}`, {
      signal: thunkAPI.signal
    });
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    getListBlog: (action) => {
      console.log("action: ", action);
      postsAdapter.upsertMany(initialState, initalPostList2);
    }
  },
  extraReducers: (builder) => {
    // get All
    builder.addCase(getListBlog.fulfilled, (state, action) => {
      postsAdapter.upsertMany(initialState, initalPostList2);
    });
  }
});

export default blogSlice.reducer;

// export const addPost = createAction(
//   "blog/add",
//   function (post: Omit<IPost, "id">) {
//     return {
//       payload: {
//         ...post,
//         id: nanoid()
//       }
//     };
//   }
// );
// export const deletePost = createAction<string>("blog/delete");
// export const startEditPost = createAction<string>("blog/startEditPost");
// export const cancelEditPost = createAction("blog/cancelEditPost");
// export const editPost = createAction<IPost>("blog/editPost");

// const blogReducer = createReducer(initialState, (builder) => {
//   builder.addCase(addPost, (state, action) => {
//     const newData = action.payload;
//     state.postList.push(newData);
//   });

//   builder.addCase(deletePost, (state, action) => {
//     const postId = action.payload;
//     const foundPostIndex = state.postList.findIndex(
//       (post) => post.id === postId
//     );

//     if (foundPostIndex !== -1) {
//       state.postList.splice(foundPostIndex, 1);
//     }
//   });
//   builder.addCase(startEditPost, (state, action) => {
//     if (action.payload) {
//       const findPost = state.postList.find(
//         (item) => item.id === action.payload
//       );
//       if (findPost) {
//         state.postEdit = findPost;
//       }
//     }
//   });

//   builder.addCase(cancelEditPost, (state) => {
//     state.postEdit = null;
//   });

//   builder.addCase(editPost, (state, action) => {
//     state.postList.forEach((item, index) => {
//       if (item.id === action.payload.id) {
//         state.postList[index] = action.payload;
//         return;
//       }
//     });
//   });
// });
