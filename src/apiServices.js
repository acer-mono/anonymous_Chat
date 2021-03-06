import axios from 'axios';

export const URL = 'localhost:3001';
const PROTOCOL = 'http';

const axiosInstance = axios.create({
  baseURL: `${PROTOCOL}://${URL}`,
  withCredentials: true,
});

const jsonInterceptor = [response => response.data, error => Promise.reject(error)];
axiosInstance.interceptors.response.use(...jsonInterceptor);

export default {
  auth: {
    login: ({ nickname, password }) => axiosInstance.post('/auth', { nickname, password }),
    logout: () => axiosInstance.delete('/auth'),
    check: () => axiosInstance.get('/auth'),
  },
  user: {
    create: ({ nickname, password }) => axiosInstance.post('/user', { nickname, password }),
    getCurrent: () => axiosInstance.get('/user'),
    getById: id => axiosInstance.get(`/user/${id}`),
    find: nickname => axiosInstance.get(`/user/?nickname=${nickname}`),
    edit: password => axiosInstance.put('/user', { password }),
  },
  chat: {
    create: params => axiosInstance.post('/chat', params),
    getMyChats: userId => axiosInstance.get(`/chat/?participantId=${userId}`),
    search: title => axiosInstance.get(`/chat/?title=${title}`),
    getInfo: id => axiosInstance.get(`/chat/${id}`),
    delete: id => axiosInstance.delete(`/chat/${id}`),
    join: chatId => axiosInstance.put(`/chat/${chatId}`),
    edit: ({ id, title, isPrivate }) => axiosInstance.put(`/chat/${id}`, { title, isPrivate }),
  },
  message: {
    create: ({ content, chatId }) => axiosInstance.post('/message', { content, chatId }),
    getMessages: chatId => axiosInstance.get(`/message/?chatId=${chatId}`),
    delete: id => axiosInstance.delete(`/message/${id}`),
  },
};
