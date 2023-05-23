const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//* Retrieves the wishlist items for a given user ID
const getWishlist = async ({ userId }) => {
  return await prisma.wishlist.findMany({
    where: { user_id: userId },
    include: {
      products: {
        select: {
          name: true,
          price: true,
          id: true,
        },
      },
    },
  });
};

//* Adds a product to the wishlist for a given user ID
const addToWishlist = async ({ userId, productId }) => {
  return await prisma.wishlist.create({
    data: {
      product_id: productId,
      user_id: userId,
    },
  });
};

//* Deletes a product from the wishlist for a given user ID
const deleteFromWishlist = async ({ userId, productId }) => {
  return await prisma.wishlist.delete({
    where: {
      user_id_product_id: {
        product_id: productId,
        user_id: userId,
      },
    },
  });
};

module.exports = {
  getWishlist,
  addToWishlist,
  deleteFromWishlist,
};
