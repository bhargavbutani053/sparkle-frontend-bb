import env from "react-dotenv"
require('dotenv').config()

const protocol = 'https';
const host = "3.135.244.200:8000";
// const protocol = "http";
// const host = "localhost:8000";
console.log("process", env.REACT_APP_SERVER_HOST)
const hostUrl = `${protocol}://${host}/api/`;
export const API = {
  protocol: protocol,
  host: host,
  hostUrl: hostUrl,
};
    