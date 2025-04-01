const { addItem, getItems, updateItem, deleteItem } = require('./db');
import { getApiResponse } from './express.js';


//shakti
function getGreetingMessage() {
  return "Hello from imported function!";
}

function saveDataToJson(data) {
  localStorage.setItem('data', JSON.stringify(data));
}
const data = {
  data:'shakti'
};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    data[`${url.pathname}`] = url.pathname;
    if (url.pathname === "/api/greet") {
     
      return new Response(JSON.stringify({ message: data}), {
        headers: { "Content-Type": "application/json" },
      });
    }
    
    return new Response(JSON.stringify({ message: data}));
  },
};
