import { getListBlog, postsAdapter } from "pages/blog/blog.reducer";
import { useEffect } from "react";
import { RootState, store, useAppDispatch } from "store";
import PostItem from "../PostItem";
import { useSelector } from "react-redux";

export const PostList = () => {
  // const booksSelectors = postsAdapter.getSelectors(
  //   (state: RootState) => state.blog
  // );

  // const a = booksSelectors.selectAll(store.getState());
  // console.log("booksSelectors: ", a);
  const booksSelectors = postsAdapter.getSelectors<RootState>(
    (state) => state.blog
  );

  // And then use the selectors to retrieve values
  const allBooks = booksSelectors.selectAll(store.getState());
  console.log("allBooks: ", allBooks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListBlog());
  }, [dispatch]);
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Tài Dev Blog
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ.
              Nhưng ngày mốt sẽ có nắng
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
            {/* {a.map((item) => (
              <PostItem key={item.id} item={item} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
