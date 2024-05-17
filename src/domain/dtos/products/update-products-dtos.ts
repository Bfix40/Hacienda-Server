export class UpdateProductDto {

    private constructor(
    public readonly id: number,
    public readonly handle: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly SKU?: string,
    public readonly grams?: number,
    public readonly stock?: number,
    public readonly price?: number,
    public readonly comparePrice?: number,
    public readonly barcode?: string,
    public readonly user?: string, // ID
    public readonly category?: string, // ID
  ) { }

  static create( props: { [ key: string ]: any; } ): [ string?, UpdateProductDto?] {

      const {
        id,
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

    return [
      undefined,
        new UpdateProductDto(
          id,
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
