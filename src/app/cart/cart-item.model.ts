export class CartItem {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public imagePath: string,
    public quantity: number
  ) {}
}
