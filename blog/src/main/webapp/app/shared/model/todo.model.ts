export interface ITodo {
  id?: number;
  title?: string;
  description?: string;
  complete?: boolean;
}

export class Todo implements ITodo {
  constructor(public id?: number, public title?: string, public description?: string, public complete?: boolean) {
    this.complete = this.complete || false;
  }
}
