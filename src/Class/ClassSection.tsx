// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { TDog, UsingComponent } from "../types";

export class ClassSection extends Component<{
  createDog: (dog: Omit<TDog, "id">) => void;
  isLoading: boolean;
  allDogs: TDog[];
  deleteDog: (dogId: number) => void;
  updateDog: (dogId: number, isFavorite: boolean) => void;
}> {
  state = {
    activeComponent: "all-dogs",
  };
  toggleTab = (input: UsingComponent) => {
    const { activeComponent } = this.state;
    input === "all-dogs"
      ? this.setState({ activeComponent: "all-dogs" })
      : input === activeComponent
      ? this.setState({ activeComponent: "all-dogs" })
      : input !== activeComponent
      ? this.setState({ activeComponent: input })
      : null;
  };
  render() {
    const { allDogs, isLoading, createDog, deleteDog, updateDog } = this.props;
    const { activeComponent } = this.state;
    const { toggleTab } = this;

    const favoriteDogs = allDogs.filter((dog) => dog.isFavorite === true);
    const unfavoriteDogs = allDogs.filter((dog) => dog.isFavorite === false);
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/"} className="btn">
            Home
          </Link>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <Link to={"/playground"} className="btn">
            Playground
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                activeComponent === "favorited-dogs" ? "active" : ""
              }`}
              onClick={() => {
                toggleTab("favorited-dogs");
              }}
            >
              favorited ( {favoriteDogs.length} )
            </div>
            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeComponent === "unfavorited-dogs" ? "active" : ""
              }`}
              onClick={() => {
                toggleTab("unfavorited-dogs");
              }}
            >
              unfavorited ( {unfavoriteDogs.length} )
            </div>
            <div
              className={`selector ${
                activeComponent === "create-dog-form" ? "active" : ""
              }`}
              onClick={() => {
                toggleTab("create-dog-form");
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {activeComponent === "all-dogs" && (
            <ClassDogs
              allDogs={allDogs}
              isLoading={isLoading}
              deleteDog={deleteDog}
              updateDog={updateDog}
            />
          )}
          {activeComponent === "favorited-dogs" && (
            <ClassDogs
              allDogs={favoriteDogs}
              isLoading={isLoading}
              deleteDog={deleteDog}
              updateDog={updateDog}
            />
          )}
          {activeComponent === "unfavorited-dogs" && (
            <ClassDogs
              allDogs={unfavoriteDogs}
              isLoading={isLoading}
              deleteDog={deleteDog}
              updateDog={updateDog}
            />
          )}

          {activeComponent === "create-dog-form" && (
            <ClassCreateDogForm createDog={createDog} isLoading={isLoading} />
          )}
        </div>
      </section>
    );
  }
}
