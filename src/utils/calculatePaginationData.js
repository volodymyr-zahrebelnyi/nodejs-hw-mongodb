export const calculatePaginationData = (totalItems, page, perPage) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  console.log(totalPages);

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
