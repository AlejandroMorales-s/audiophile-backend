const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOrders = async ({ userId }) => {
  return await prisma.orders.findMany({
    where: { user_id: userId },
  });
};

const createOrder = async ({ pricing, products, shippingInfo, userId }) => {
  return await prisma.orders.create({
    data: {
      pricing,
      shipping_info: shippingInfo,
      products,
      user_id: userId,
    },
    select: {
      products: true,
      pricing: true,
    },
  });
};

module.exports = {
  createOrder,
  getOrders,
};
