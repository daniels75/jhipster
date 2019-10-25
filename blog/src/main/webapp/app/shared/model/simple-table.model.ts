export interface ISimpleTable {
  id?: number;
  name?: string;
  content?: string;
}

export class SimpleTable implements ISimpleTable {
  constructor(public id?: number, public name?: string, public content?: string) {}
}
