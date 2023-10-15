import React, { createContext, useCallback, useContext, useState } from "react";
import AsyncOperationStatus from "../utils/AsyncOperationStatus";
import BlogApiService from "../services/blogApiService";

const blogDataContext = createContext();

export function useBlogData() {
  return useContext(blogDataContext);
}
const BlogDataContextProvider = ({ children }) => {
  const [asyncStatus, setAsyncStatus] = useState(AsyncOperationStatus.default);
  const [allPosts, setAllPosts] = useState([]);
  const [authoredPosts, setAuthoredPosts] = useState([]);

  const getAllPost = useCallback(async () => {
    const blogApiServiceInstance = new BlogApiService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      let response = await blogApiServiceInstance.getAllPost();
      setAsyncStatus(AsyncOperationStatus.success);
      setAllPosts(response);
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      console.error(error);
    }
  }, []);

  const getAllPostsByUser = useCallback(async () => {
    const blogApiServiceInstance = new BlogApiService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      let response = await blogApiServiceInstance.getAllPostByUser();
      setAsyncStatus(AsyncOperationStatus.success);
      setAuthoredPosts(response);
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      return error.data.error;
    }
  }, []);

  const createPost = useCallback(async (title, content) => {
    const blogApiServiceInstance = new BlogApiService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      let response = blogApiServiceInstance.createPost(title, content);
      setAsyncStatus(AsyncOperationStatus.success);
      return response.data.message;
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      return error.data.error;
    }
  }, []);

  const updatePost = useCallback(async (blogId, title, content) => {
    const blogApiServiceInstance = new BlogApiService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      let response = blogApiServiceInstance.updatePost(blogId, title, content);
      setAsyncStatus(AsyncOperationStatus.success);
      return response.data.message;
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      return error.data.error;
    }
  }, []);

  const deletePost = useCallback(async (blogId) => {
    const blogApiServiceInstance = new BlogApiService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      let response = blogApiServiceInstance.deletePost(blogId);
      setAsyncStatus(AsyncOperationStatus.success);
      setAuthoredPosts((authoredPosts) =>
        authoredPosts.filter((blog) => blog._id != blogId)
      );
      return response;
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      return error.data.error;
    }
  }, []);

  const contextValue = {
    getAllPost,
    getAllPostsByUser,
    createPost,
    updatePost,
    deletePost,
    asyncStatus,
    allPosts,
    authoredPosts,
  };
  return (
    <blogDataContext.Provider value={contextValue}>
      {children}
    </blogDataContext.Provider>
  );
};

export default BlogDataContextProvider;
