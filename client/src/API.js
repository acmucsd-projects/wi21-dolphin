import axios from 'axios';

// ADD THIS

const serverUrl = "http://localhost:5000";

const API = {
    getAllHobbies: function() {
        return axios.get(`${serverUrl}/hobbies/all`);
    },
    getHobbyByName: function(name) {
        return axios.get(`${serverUrl}/hobbies/byName?name=` + name);
    },
    getHobbyById: function(id) {
        return axios.get(`${serverUrl}/hobbies/byId?id=` + id);
    },
    getAllCategories: function() {
        return axios.get(`${serverUrl}/categories/all`);
    },
    getOneCategory: function(name) {
        return axios.get(`${serverUrl}/categories?name=` + name);
    },
    getUser: function(username) {
        return axios.get(`${serverUrl}/users?user_name=` + username);
    },
    postUser: function(username, password) {
        return axios.post(`${serverUrl}/users?user_name=` + username + `&password=` + password);
    },
    getPost: function(posted_by, content, hobby, title) {
        return axios.get(`${serverUrl}/posts/one?posted_by=` + posted_by + `&content=` + content + `&hobby=` + hobby + `&title=` + title);
    },
    getPostsHobby: function(hobby) {
        return axios.get(`${serverUrl}/posts/viaHobby?hobby=` + hobby);
    },
    addLike: function(posted_by, content, hobby, title, liked_by) {
        return axios.put(`${serverUrl}/posts/like?posted_by=` + posted_by + `&content=` + content + `&hobby=` + hobby + `&title=` + title + `&liked_by=` + liked_by);
    },
    removeLike: function(posted_by, content, hobby, title, disliked_by) {
        return axios.put(`${serverUrl}/posts/dislike?posted_by=` + posted_by + `&content=` + content + `&hobby=` + hobby + `&title=` + title + `&disliked_by=` + disliked_by);
    },
    getPostsUser: function(username) {
        return axios.get(`${serverUrl}/posts/viaUser?user_name` + username);
    },
    postPost: function(username, content, hobby, title) {
        return axios.post(`${serverUrl}/posts?user_name=` + username + `&content=` + content + `&hobby=` + hobby + `&title=` + title);
    },
    deletePost: function(hobby) {
        return axios.delete(`${serverUrl}/posts?hobby=` + hobby);
    },
    signIn: function(user, pwd) {
        return axios.post(`${serverUrl}/users/signin?user=` + user + `&pwd=` + pwd);
    },
    verifyToken: function(token) {
        return axios.get(`${serverUrl}/users/verifyToken?token=` + token);
    },
    editBio: function(username, biography) {
        return axios.put(`${serverUrl}/users/editBio?username=` + username + `&biography=` + biography);
    }

}

export default API;