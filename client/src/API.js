import axios from 'axios';

// ADD THIS

const serverUrl = "http://localhost:5000";

const API = {
    getAllHobbies: function() {
        return axios.get(`${serverUrl}/hobbies/all`);
    },
    getOneHobby: function(hobby) {
        return axios.get(`${serverUrl}/hobbies/one?name=` + hobby);
    },
    getCategory: function(category) {
        return axios.get(`${serverUrl}/categories?name=` + category);
    },
    getUser: function(username, password) {
        return axios.get(`${serverUrl}/users?user_name=` + username + `&password=` + password);
    },
    postUser: function(username, password) {
        return axios.post(`${serverUrl}/users?user_name=` + username + `&password=` + password);
    },
    getPostsHobby: function(hobby) {
        return axios.get(`${serverUrl}/posts/viaHobby?hobby=` + hobby);
    },
    getPostsUser: function(username) {
        return axios.get(`${serverUrl}/posts/viaUser?user_name` + username);
    },
    postPost: function(username, content, hobby) {
        return axios.post(`${serverUrl}/posts?user_name` + username + `&content=` + content + `&hobby=` + hobby);
    },
    deletePost: function(hobby) {
        return axios.delete(`${serverUrl}/posts?hobby=` + hobby);
    }

}

export default API;