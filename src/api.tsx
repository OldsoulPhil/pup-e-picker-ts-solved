import { TDog } from "./types";

export const baseUrl = "http://localhost:3000/dogs";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async () => {
    return await fetch(baseUrl);
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog: Omit<TDog, "id">) => {
    return await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
  },

  // should delete a dog from the database
  deleteDog: async (dogId: number) => {
    return await fetch(`${baseUrl}/${dogId}`, {
      method: "DELETE",
    });
  },

  updateDog: async (dogId: number, isFavorite: boolean) => {
    const favStatus = !isFavorite;
    return await fetch(`${baseUrl}/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite: favStatus }),
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
