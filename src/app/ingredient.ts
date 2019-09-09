export class Ingredient {
    id: number;
    liquid: number;
    private _liquidName: string;
    public get liquidName(): string {
        return this._liquidName;
    }
    public set liquidName(value: string) {
        this._liquidName = value;
    }
    volume: number;
    drinksId: number;
    leftTime: number;
      

}
