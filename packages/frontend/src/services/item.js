const addItem = async (params) => {
  const {
    addItemMutation, name, location, description, value, quantity, imageUrl,
  } = params;
  try {
    const res = await addItemMutation({
      variables: {
        name, location, description, value: value * 1, quantity: quantity * 1, imageUrl,
      },
    });
    return res.data.createItem;
  } catch (e) {
    return { error: e.message };
  }
};

const itemService = {
  addItem,
};

export default itemService;
