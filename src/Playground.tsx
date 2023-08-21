import { Requests } from "./api";

const messAround = async () => {
  await Requests.updateDog(20, false);
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
