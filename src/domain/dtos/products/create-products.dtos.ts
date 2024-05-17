import { isValidUserId } from '../../../config';

export class CreateProductDto {

  private constructor(
    public readonly handle: string,
    public readonly title: string,
    public readonly description: string,
    public readonly SKU: string,
    public readonly grams: number,
    public readonly stock: number,
    public readonly price: number,
    public readonly comparePrice: number,
    public readonly barcode: string,
    public readonly user: string, // ID
    public readonly category: string, // ID
  ) { }

  static create( props: { [ key: string ]: any; } ): [ string?, CreateProductDto?] {

    const {
      handle,
      title,
      description,
      SKU,
      grams,
      stock,
      price,
      comparePrice,
      barcode,
      user,
      category,
    } = props;


    if ( !handle ) return [ 'Missing handle' ];

    if ( !user ) return [ 'Missing user' ];
    if ( !isValidUserId(user) ) return ['Invalid User ID'];
    
    if ( !category ) return [ 'Missing category' ];
    if ( !isValidUserId(category) ) return ['Invalid User ID'];
    

    return [
      undefined,
      new CreateProductDto(
        handle,
        title,
        description,
        SKU,
        grams,
        stock,
        price,
        comparePrice,
        barcode,
        user,
        category,
      )
    ];


  }


}
