import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { tempArticlesData } from '../common/fixtures';

export type Article = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
  deleted: boolean;
  dead: boolean;
  parent: number;
  newKids: Article[];
};

const client = (() => {
  return axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0',
  });
})();

const request = async (config: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<any>) => {
    const { data } = response;
    return data;
  };

  const onError = (error: any) => {
    return Promise.reject(error.response);
  };

  return client(config).then(onSuccess).catch(onError);
};

const getItem = (id: number) => {
  return { url: `/item/${id}.json`, method: 'GET' };
};

export default class Client {
  static getArticleFromId(id: number) {
    return request(getItem(id));
  }

  static getCommentFromId(id: number) {
    return request(getItem(id));
  }

  static getUser(author: string | undefined) {
    if (typeof author === 'undefined') {
      return Promise.reject(new Error('Invalid author'));
    }
    return request({ url: `/user/${author}.json`, method: 'GET' });
  }

  static async getAllComments(item: Article | undefined): Promise<Article> {
    if (typeof item === 'undefined') {
      return Promise.reject(new Error('Invalid Item'));
    }

    let level = 0;
    const response: Record<string, Article> = {};
    const recurse = async (item: Article): Promise<void> => {
      if (item && item.kids) {
        item.newKids = [];

        const fetchedComments = await Promise.all(
          item.kids.map((id) => {
            return this.getCommentFromId(id);
          })
        );

        await Promise.all(
          fetchedComments.map((newItem) => {
            item.newKids = [...item.newKids, newItem];

            if (!response[item.id] && level === 0) {
              response[item.id] = item;
              level++;
            }

            return recurse(newItem);
          })
        );
      }
    };

    const tempItem = { ...item, newKids: [] };
    await recurse(tempItem);
    return response[tempItem.id];
  }

  static getTempArticleData() {
    return Promise.resolve(tempArticlesData);
  }
}
