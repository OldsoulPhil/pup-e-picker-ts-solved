import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { TDog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export class ClassApp extends Component {
  state = {
    allDogs: [],
    isLoading: false,
  };
  fetchTheDogs = () => {
    this.setState({ isloading: true });
    return Requests.getAllDogs()
      .then((data) => this.setState({ allDogs: data }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };
  componentMounted(): void {
    this.fetchTheDogs();
  }
  createTheD = (dog: Omit<TDog, "id">) => {
    Requests.postDog(dog)
      .then(() => {
        this.fetchTheDogs();
      })
      .then(() => {
        toast.success("Dog Created");
      });
  };
  deleteTheD = (dogId: number) => {
    Requests.deleteDog(dogId).then(() => {
      this.fetchTheDogs();
    });
  };
  updateTheD = (dogId: number, isFavorite: boolean) => {
    Requests.updateDog(dogId, isFavorite).then(() => {
      this.fetchTheDogs();
    });
  };

  render() {
    const { updateTheD, createTheD, deleteTheD } = this;
    const { allDogs, isLoading } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          updateTheD={updateTheD}
          createTheD={createTheD}
          deleteTheD={deleteTheD}
          allDogs={allDogs}
          isLoading={isLoading}
        />
        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
