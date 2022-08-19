import axiosClient from './axiosClient';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const sortType = {
  popular: 'popular',
  top_rated: 'top_rated',
  //for movie request
  upcoming: 'upcoming',
  //for tv request
  on_the_air: 'on_the_air',
};

// export const tvType = {
//   popular: 'popular',
//   topRated: 'top_rated',
// };

const api = {
  //   getMoviesList: (type, params) => {
  //     const url = `movie/${sortType[type]}`;
  //     return axiosClient.get(url, params);
  //   },
  //   getTvList: (type, params) => {
  //     const url = `tv/${sortType[type]}`;
  //     return axiosClient.get(url, params);
  //   },
  getList: (cate, type, params) => {
    const url = `${category[cate]}/${sortType[type]}`;
    return axiosClient.get(url, params);
  },
  getTrending: (cate, time, params) => {
    const url = `trending/${category[cate]}/${time}`;
    return axiosClient.get(url, params);
  },
  getGenres: (cate, params) => {
    const url = `genre/${category[cate]}/list`;
    return axiosClient.get(url, params);
  },
  getDiscover: (cate, params) => {
    const url = `discover/${category[cate]}`;
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos`;
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = `search/${category[cate]}`;
    return axiosClient.get(url, params);
  },
  multi: (params) => {
    const url = `search/multi`;
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = `${category[cate]}/${id}`;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = `${category[cate]}/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = `${category[cate]}/${id}/similar`;
    return axiosClient.get(url, { params: {} });
  },
};

export default api;
