import { useState } from "react";
import { useAddPlayerMutation } from "./puppySlice";

/**
 * @component
 * Users can add players to the roster by submitting this form.
 */
export default function PlayerForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  // Use the `addPlayer` mutation to add a Player when the form is submitted
  const [addPlayer, { isLoading, error }] = useAddPlayerMutation();

  async function postPlayer(event) {
    event.preventDefault();

    // Placeholder image w/ random photos of dogs
    const imageUrl = "https://loremflickr.com/200/300/dog";
    try {
      await addPlayer({ name, breed, imageUrl }).unwrap();
    } catch (err) {
      console.error("Failed to add the Player:", err);
    }
  }

  return (
    <>
      <h2>Add a Player</h2>
      <form onSubmit={postPlayer}>
        <label>
          Name
          <input
            name="playerName"
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
        {isLoading && <output>Uploading Player information...</output>} // Update output message
        {error && <output>{error.message}</output>}
      </form>
    </>
  );
}
