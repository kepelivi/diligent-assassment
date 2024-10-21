import { Store } from "./stores/store.type"

export type RecipeType = {
  id: number
  name: string
}

export type CreateRecipeType = Omit<RecipeType, "id">;

export class Recipe {
  private store;

  constructor(store: Store<RecipeType[]>) {
    this.store = store;
  }

  async readAll() {
    return await this.store.getValue();
  }
}


