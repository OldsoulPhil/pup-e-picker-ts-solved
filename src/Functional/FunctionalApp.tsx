import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { TDog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<TDog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createDog = (dog: Omit<TDog, "id">) => {
    Requests.postDog(dog)
      .then(() => {
        fetchData();
      })
      .then(() => {
        toast.success("You have posted a new doggo");
      });
  };

  const deleteDog = (dogId: number) => {
    Requests.deleteDog(dogId).then(() => {
      fetchData();
    });
  };

  const updateDog = (dogId: number, isFavorite: boolean) => {
    Requests.updateDog(dogId, isFavorite).then(() => {
      fetchData();
    });
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        isLoading={isLoading}
        deleteDog={deleteDog}
        updateDog={updateDog}
        createDog={createDog}
      />
    </div>
  );
}
