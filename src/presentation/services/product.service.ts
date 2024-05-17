import { PrismaClient } from '@prisma/client';
import { CreateProductDto, CustomError, PaginationDto, UpdateProductDto } from '../../domain';

const prisma = new PrismaClient();

export class ProductService {

  // DI
  constructor() { }

  async createProduct( createProductDto: CreateProductDto ) {

    const productExists = await prisma.product.findUnique({ where: { handle: createProductDto.handle } });
    if ( productExists ) throw CustomError.badRequest( 'Product already exists' );

    try {

      const product = await prisma.product.create({
  data: {
    ...createProductDto,
    user: {
      connect: {
        id: Number(createProductDto.user),
      },
    },
    category: {
      connect: {
        id: Number(createProductDto.category),
      },
    },
  },
});


      return product;

    } catch ( error ) {
      throw CustomError.InternalServerError( `${ error }` );
    }

  }

  async getProducts( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;

    try {

      const total = await prisma.product.count();
      const products = await prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: true,
          category: true
        }
      });

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: ( page - 1 > 0 ) ? `/api/products?page=${ ( page - 1 ) }&limit=${ limit }` : null,

        products: products,
      };

    } catch ( error ) {
      throw CustomError.InternalServerError( 'Internal Server Error' );
    }

  }

  async deleteProduct(productId: number) {
  const productExists = await prisma.product.findUnique({ where: { id: productId } });
  if (!productExists) throw CustomError.badRequest('Product does not exist');

  try {
    await prisma.product.delete({ where: { id: productId } });
    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw CustomError.InternalServerError(`${error}`);
  }
}

//! couldn't do the update
/*
async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
  const productExists = await prisma.product.findUnique({ where: { id: productId } });
  if (!productExists) throw CustomError.badRequest('Product does not exist');

  try {
    const data: any = { ...updateProductDto };

    if (updateProductDto.user !== undefined && updateProductDto.user !== null) {
      data.user = {
        connect: {
          id: Number(updateProductDto.user),
        },
      };
    }

    if (updateProductDto.category !== undefined && updateProductDto.category !== null) {
      data.category = {
        connect: {
          id: Number(updateProductDto.category),
        },
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data,
    });

    return updatedProduct;
  } catch (error) {
    throw CustomError.InternalServerError(`${error}`);
  }
}

*/

}
