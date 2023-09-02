import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { TDog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

type ClassAppState = {
  allDogs: TDog[];
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  state: ClassAppState = {
    allDogs: [],
    isLoading: false,
  };

  fetchData = () => {
    this.setState({ isLoading: true });
    return Requests.getAllDogs()
      .then((data) => this.setState({ allDogs: data }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  createDog = (dog: Omit<TDog, "id">) => {
    Requests.postDog(dog)
      .then(() => {
        this.fetchData();
      })
      .then(() => {
        toast.success("Dog Created");
      });
  };

  deleteDog = (dogId: number) => {
    Requests.deleteDog(dogId).then(() => {
      this.fetchData();
    });
  };

  updateDog = (dogId: number, isFavorite: boolean) => {
    Requests.updateDog(dogId, isFavorite).then(() => {
      this.fetchData();
    });
  };

  render() {
    const { updateDog, createDog, deleteDog } = this;
    const { allDogs, isLoading } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          updateDog={updateDog}
          createDog={createDog}
          deleteDog={deleteDog}
          allDogs={allDogs}
          isLoading={isLoading}
        />
      </div>
    );
  }
}
