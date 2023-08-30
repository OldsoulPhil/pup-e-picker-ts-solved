// Add your own custom types in here
export type TDog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};
export type Props = {
  allDogs: TDog[];
};

export type UsingComponent =
  | "all-dogs"
  | "favorited-dogs"
  | "unfavorited-dogs"
  | "create-dog-form";
