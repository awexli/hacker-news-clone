import axios from 'axios';

export default class ApiService {
  static HackerNewsApi(id) {
    return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  }

  static UserApi(id) {
    return `https://hacker-news.firebaseio.com/v0/user/${id}.json`;
  }

  static getArticleFromId(id) {
    return axios.get(ApiService.HackerNewsApi(id));
  }

  static getCommentFromId(id) {
    return axios.get(ApiService.HackerNewsApi(id));
  }

  static getNewCommentBatch(req) {
    const { allComments, currentIndex, nextIndex } = req;
    const newCommentBatch = allComments.slice(currentIndex, nextIndex);
    const newCommentsPromise = newCommentBatch.map((id) =>
      ApiService.getCommentFromId(id)
    );

    return Promise.all(newCommentsPromise);
  }

  static getCommentReplies(kids) {
    const commentRepliesPromise = kids.map((id) =>
      ApiService.getCommentFromId(id)
    );

    return Promise.all(commentRepliesPromise);
  }

  // TODO: add ability to recurse specified amount of levels
  static async getComments(req) {
    try {
      const comments = await ApiService.getNewCommentBatch(req);

      for (const comment of comments) {
        const kids = comment.data.kids;
        if (kids) {
          comment.data.kids = await ApiService.getCommentReplies(kids);
        }
      }

      return comments;
    } catch (error) {
      console.log('getComments error - ' + error);
    }

    return [];
  }

  static getUserFromId(id) {
    return axios.get(ApiService.UserApi(id));
  }
}
