

export const ImageEnv = (path) => {
   return process.env.NODE_ENV ==='production' ? path : `img/${path}`  
}