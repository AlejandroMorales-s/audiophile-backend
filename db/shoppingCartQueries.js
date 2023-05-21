const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getShoppingCart = async ({ device, userId }) => {
  return await prisma.shopping_cart.findMany({
    where: { user_id: userId },

    select: {
      quantity: true,

      products: {
        select: {
          name: true,
          price: true,
          id: true,

          product_image: {
            select: {
              image_url: true,
            },

            where: {
              image_url: {
                contains: device,
              },
            },
          },
        },
      },
    },
  });
};

const addItemToShoppingCart = async ({ productId, quantity, userId }) => {
  return await prisma.shopping_cart.create({
    data: {
      product_id: productId,
      quantity: parseInt(quantity),
      user_id: userId,
    },
  });
};

const deleteItemFromShoppingCart = async ({ productId, userId }) => {
  return await prisma.shopping_cart.delete({
    where: { user_id_product_id: { product_id: productId, user_id: userId } },
  });
};

const deleteAllItemsFromShoppingCart = async ({ userId }) => {
  return await prisma.shopping_cart.deleteMany({
    where: { user_id: userId },
  });
};

const updateItemQuantityInShoppingCart = async ({
  userId,
  productId,
  quantity,
}) => {
  return await prisma.shopping_cart.update({
    where: {
      user_id_product_id: {
        product_id: productId,
        user_id: userId,
      },
    },
    data: {
      quantity,
    },
    select: {
      quantity: true,
    },
  });
};

module.exports = {
  getShoppingCart,
  deleteItemFromShoppingCart,
  deleteAllItemsFromShoppingCart,
  addItemToShoppingCart,
  updateItemQuantityInShoppingCart,
};
