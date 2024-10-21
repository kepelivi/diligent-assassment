import { AppError } from "./app.error";
import { Recipe, RecipeType, CreateRecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if (args.length > 0) {
    throw new AppError(`The list command should not have any argument.`);
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {
  if (typeof parseInt(args[0]) !== "number") {
    throw new Error('Id cannot be non numeric type.')
  }
  const id = parseInt(args[0]);
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const foundRecipe = recipes.find(recipe => recipe.id === id);
  const formatted = `- [${foundRecipe?.id}] ${foundRecipe?.name}`;
  console.log('Details of recipe:');
  console.log(formatted);
}

export async function create(store: Store<RecipeType[]>, args: string[]) {
  if (args.length === 0) {
    throw new AppError('Please provide a recipe name.');
  }
  const createdRecipe: CreateRecipeType = { name: args.join() };
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const id = recipes.length + 1;
  const formatted = `- [${id}] ${createdRecipe.name}`;
  console.log('Details of recipe:');
  console.log(formatted);
}