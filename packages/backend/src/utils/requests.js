export const find = (model, userId) => {
  return model.findAll({
    where: { userId },
    limit: 5,
  });
}
