import axios from "axios";


export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "http://127.0.0.1:8000/api/v1";
  const accessToken = useCookie('accessToken')
  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Content-Type': 'image/jpeg',
      'Authorization': `Bearer ${accessToken.value}`
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const accessToken = useCookie('accessToken')
      if (accessToken.value) {
        config.headers['Authorization'] = `Bearer ${accessToken.value}`
      } 
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },

    async function (error) {
    const config = error?.config
    const refreshToken = useCookie('refreshToken')
    const accessToken = useCookie('accessToken')

    if(error.response.statusText === 'Unauthorized' && !config._retry && refreshToken.value){
      config._retry = true;
      
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {refresh: refreshToken.value},  
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      
      if (response.statusText === 'OK') {
        accessToken.value = response.data.access
        refreshToken.value = response.data.refresh
  
        config.headers['Authorization'] = `Bearer ${response.data.access}`
        return api(config);
      }
      
    }
    return Promise.reject(error);
  });

  let publicClient = axios.create({
    baseURL: defaultUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return {
    provide: {
      api: api,
      publicClient: publicClient,
    },
  };
});