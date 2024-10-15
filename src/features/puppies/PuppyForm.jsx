import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  // TODO: Use the `addPlayer` mutation to add a Player when the form is submitted
  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

  async function postPuppy(event) {
    event.preventDefault();

    // Placeholder image w/ random photos of dogs
    const imageUrl = "https://loremflickr.com/200/300/dog";
    try {
      await addPuppy({ name, breed, imageUrl }).unwrap();
    } catch (err) {
      console.error("Failed to add the Puppy:", err);
    }
  }

  return (
    <>
      <h2>Add a Player</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add to Roster"}
        </button>
        {isLoading && <output>Uploading <Puppy></Puppy> information...</output>}
        {error && <output>{error.message}</output>}
      </form>
    </>
  );
}
