import axios from 'axios';

export default class ApiService {
  static HackerNewsApi(id) {
    return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  }

  static getArticleFromId(id) {
    return axios.get(ApiService.HackerNewsApi(id));
  }

  static getCommentFromId(id) {
    return axios.get(ApiService.HackerNewsApi(id));
  }
}
