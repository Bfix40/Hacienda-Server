import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from '../../domain';

const prisma = new PrismaClient();

export class CategoryService {

  // DI
  constructor() { }

  async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ) {

    const categoryExists = await prisma.category.findUnique({ where: { name: createCategoryDto.name } });
    if ( categoryExists ) throw CustomError.badRequest( 'Category already exists' );

    try {

      const category = await prisma.category.create({
  data: {
    ...createCategoryDto,
    user: {
      connect: {
        id: user.id,
      },
    },
  },
});


      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };

    } catch ( error ) {
      throw CustomError.InternalServerError( `${ error }` );
    }

  }

  async getCategories( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;

    try {

      const total = await prisma.category.count();
      const categories = await prisma.category.findMany({
        skip: (page - 1) * limit,
        take: limit
      });

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/categories?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: (page - 1 > 0) ? `/api/categories?page=${ ( page - 1 ) }&limit=${ limit }`: null,

        categories: categories.map( category => ( {
          id: category.id,
          name: category.name,
          available: category.available,
        } ) )
      };

    } catch ( error ) {
      throw CustomError.InternalServerError( 'Internal Server Error' );
    }

  }

}
