const getPaginationOptions = (query?: FindQuery): PaginationOptions => {
  if (!query) {
    return {};
  }
  const { perPage = 100, page = 1 } = query;
  const skip = (page - 1) * perPage;
  return { take: perPage, skip };
};

export default getPaginationOptions;
