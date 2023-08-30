// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { TDog } from "../types";
import { useState, useEffect, useRef } from "react";

export const FunctionalSection = ({
  createDog,
  allDogs,
  isLoading,
  deleteDog,
  updateDog,
}: {
  createDog: (dog: Omit<TDog, "id">) => void;
  isLoading: boolean;
  allDogs: TDog[];
  deleteDog: (dogId: number) => void;
  updateDog: (dogId: number, isFavorite: boolean) => void;
}) => {
  const [favoriteDogs, setFavoriteDogs] = useState<TDog[]>([]);
  const [unFavoriteDogs, setUnFavoriteDogs] = useState<TDog[]>([]);
  const [showComponent, setShowComponent] = useState<string>("all-dogs");

  useEffect(() => {
    const favorited: TDog[] = [];
    const unfavorited: TDog[] = [];
    allDogs.map((dog) => {
      if (dog.isFavorite === true) {
        favorited.push(dog);
      } else {
        unfavorited.push(dog);
      }
    });
    setFavoriteDogs(favorited);
    setUnFavoriteDogs(unfavorited);
  }, [allDogs]);

  const ref1 = useRef("");
  const ref2 = useRef("");
  const ref3 = useRef("");
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/"} className="btn">
          Home
        </Link>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <Link to={"/playground"} className="btn">
          Playground
        </Link>

        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${ref1.current}`}
            onClick={() => {
              if (showComponent === "favorited-dogs") {
                ref1.current = "";
                return setShowComponent("all-dogs");
              }
              ref1.current = "active";
              ref2.current = "";
              ref3.current = "";
              return setShowComponent("favorited-dogs");
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${ref2.current}`}
            onClick={() => {
              if (showComponent === "unfavorited-dogs") {
                ref2.current = "";
                return setShowComponent("all-dogs");
              }
              ref1.current = "";
              ref2.current = "active";
              ref3.current = "";
              return setShowComponent("unfavorited-dogs");
            }}
          >
            unfavorited ( {unFavoriteDogs.length} )
          </div>

          <div
            className={`selector ${ref3.current}`}
            onClick={() => {
              if (showComponent === "dog-form") {
                ref3.current = "";
                return setShowComponent("all-dogs");
              }
              ref1.current = "";
              ref2.current = "";
              ref3.current = "active";
              return setShowComponent("dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {showComponent === "all-dogs" && (
          <FunctionalDogs
            allDogs={allDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {showComponent === "favorited-dogs" && (
          <FunctionalDogs
            allDogs={favoriteDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {showComponent === "unfavorited-dogs" && (
          <FunctionalDogs
            allDogs={unFavoriteDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {showComponent === "dog-form" && (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        )}
      </div>
    </section>
  );
};
