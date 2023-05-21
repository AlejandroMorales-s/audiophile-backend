const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const accessingToProductObject = ({ device }) => {
  return {
    product_details: {
      select: {
        includes: true,
        features: true,
      },
    },
    product_image: {
      select: { image_url: true },
      where: {
        image_url: {
          contains: device,
        },
      },
    },
  };
};

const getAllProducts = async ({ device }) => {
  return await prisma.products.findMany({
    include: accessingToProductObject({ device }),
  });
};

const getProductById = async ({ device, productId }) => {
  return await prisma.products.findFirstOrThrow({
    where: { id: productId },
    include: accessingToProductObject({ device }),
  });
};

const getProductsByCategory = async ({ device, category }) => {
  return await prisma.products.findMany({
    where: { category },
    include: accessingToProductObject({ device }),
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};
