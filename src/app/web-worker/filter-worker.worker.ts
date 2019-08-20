import { filterBookArray } from "./filter";

addEventListener('message', ({ data }) => {
  const resultBooks = filterBookArray(data);
  postMessage(resultBooks);
});
