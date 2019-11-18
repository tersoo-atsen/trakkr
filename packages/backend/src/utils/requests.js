export const find = (model, userId) => {
  return model.findAll({
    where: { userId },
  });
}
