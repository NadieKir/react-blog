export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
}

// export const getPagesArray = (totalPages) => {
//   let pagesArray = Array(totalPages).fill().map((e, i) => i + 1);
//   return pagesArray;
// }
export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
      result.push(i + 1)
  }
  return result;
}