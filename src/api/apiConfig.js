const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '3796f44e00425ed7f9ce24e5c32086ef',
  originalImage: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  w500Image: (path) => `https://image.tmdb.org/t/p/original/${path}`,
  w220Andh330Image: (path) =>
    `https://image.tmdb.org/t/p/w220_and_h330_face${path}`,
};

export default apiConfig;
