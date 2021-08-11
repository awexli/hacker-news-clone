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
    const { commentIds, from, to } = req;
    const newCommentBatch = commentIds.slice(from, to);
    const newCommentsPromise = newCommentBatch.map((id) => ApiService.getCommentFromId(id));

    return Promise.all(newCommentsPromise);
  }

  static getCommentReplies(kids) {
    const commentRepliesPromise = kids.map((id) => ApiService.getCommentFromId(id));

    return Promise.all(commentRepliesPromise);
  }

  /**
   *
   * @param {Object} req given comments, current index, and next index
   * @returns an array of comment ids
   */
  static async getComments(req) {
    // TODO: add ability to recurse specified amount of levels
    // for (const comment of comments) {
    //   const kids = comment.data.kids;
    //   if (kids) {
    //     comment.data.kids = await ApiService.getCommentReplies(kids);
    //   }
    // }
    return await ApiService.getNewCommentBatch(req);
  }

  static getUserFromId(id) {
    return axios.get(ApiService.UserApi(id));
  }
}
