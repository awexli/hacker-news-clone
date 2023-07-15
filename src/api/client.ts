import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Item = {
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
  newKids: Item[];
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

  static getCommentFromId(id: number): Promise<Item> {
    return request(getItem(id));
  }

  static getUser(author: string | undefined) {
    if (typeof author === 'undefined') {
      return Promise.reject(new Error('Invalid author'));
    }
    return request({ url: `/user/${author}.json`, method: 'GET' });
  }

  static async getAllComments(item: Item | undefined): Promise<Item> {
    if (typeof item === 'undefined') {
      return Promise.reject(new Error('Invalid Item'));
    }

    const rootItem = { ...item };

    const recurse = async (parent: Item): Promise<void> => {
      if (!parent?.kids?.length) {
        return;
      }

      parent.newKids = [] as Item[];

      const comments = await Promise.all(parent.kids.map((id) => this.getCommentFromId(id)));

      await Promise.all(
        comments.map((comment) => {
          parent.newKids.push(comment);

          return recurse(comment);
        })
      );
    };

    await recurse(rootItem);

    return rootItem;
  }
}
