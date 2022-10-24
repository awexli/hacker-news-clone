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

    let level = 0;
    const response: Record<string, Item> = {};

    const recurse = async (tempItem: Item): Promise<void> => {
      if (tempItem && tempItem.kids) {
        tempItem.newKids = [];

        const fetchedComments = await Promise.all(
          tempItem.kids.map((id) => {
            return this.getCommentFromId(id);
          })
        );

        await Promise.all(
          fetchedComments.map((newItem) => {
            tempItem.newKids = [...tempItem.newKids, newItem];

            if (!response[tempItem.id] && level === 0) {
              response[tempItem.id] = tempItem;
              level++;
            }

            return recurse(newItem);
          })
        );
      }
    };

    const tempItem = { ...item, newKids: [] };
    await recurse(tempItem);
    console.log(response);
    return response[tempItem.id];
  }
}
