export const find = async (model, userId, page, perPage) => {
  const searchQuery = {
    where: { userId },
  };
  const limit = perPage + 1;
  const offset = (page - 1) < 1 ? 0 : ((page - 1) * perPage);
  const { count, rows } = await model.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    ...searchQuery,
  });
  const pages = Math.ceil(count / perPage);
  const hasNextPage = rows.length > perPage;
  const hasPrevPage = page > 1 && page <= pages;
  const results = hasNextPage ? rows.slice(0, -1) : rows;
  return {
    results,
    pageInfo: {
      pages,
      hasNextPage,
      hasPrevPage,
    },
  };
}
