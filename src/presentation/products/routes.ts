import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';





export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController( productService );

    // Definir las rutas
    router.get( '/', controller.getProducts );
    router.post( '/',[ AuthMiddleware.validateJWT ], controller.createProduct );
    router.delete('/:id',[ AuthMiddleware.validateJWT ], controller.deleteProduct);
    router.put('/:id',[ AuthMiddleware.validateJWT ], controller.updateProduct);




    return router;
  }


}

