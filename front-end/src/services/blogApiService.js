import apiClient from "./apiService";

class BlogApiService {
  async getAllPost() {
    let userResult = await this.getUserId();
    let userId = userResult.data.userId;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let response = await apiClient.get(`/api/blogs/user/${userId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }

  async getAllPostByUser() {
    let userResult = await this.getUserId();
    let userId = userResult.data.userId;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let response = await apiClient.get(`/api/blogs/user/${userId}/authored`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }

  async createPost(title, content) {
    let userResult = await this.getUserId();
    let userId = userResult.data.userId;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      let response = await apiClient.post(
        `/api/blogs/user/${userId}`,
        { title: title, content: content },
        { headers: headers }
      );

      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async updatePost(blogId, title, content) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      let response = await apiClient.put(
        `/api/blogs/update/${blogId}`,
        { title: title, content: content },
        { headers: headers }
      );

      return response;
    } catch (error) {
      throw error.response;
    }
  }

  async deletePost(blogId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      let response = await apiClient.delete(`/api/blogs/delete/${blogId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }

  async getUserId() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      let userId = apiClient.get("/api/user/id", { headers });
      return userId;
    } catch (error) {
      throw error.response;
    }
  }
}

export default BlogApiService;
