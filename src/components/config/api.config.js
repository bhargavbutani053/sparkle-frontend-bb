import env from "react-dotenv"
require('dotenv').config()

// const protocol = 'https';
// const host = "3.135.244.200:8080";
const protocol = env.REACT_APP_SERVER_PROTO;
const host = env.REACT_APP_SERVER_HOST;
console.log("process", env.REACT_APP_SERVER_HOST)
const hostUrl = `${protocol}://${host}/api/`;
export const API = {
  protocol: protocol,
  host: host,
  hostUrl: hostUrl,
};
    