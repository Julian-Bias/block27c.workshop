import { useGetPlayerQuery, useDeletePlayerMutation } from "./puppySlice";
/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PlayerDetails({ selectedPlayerId, setSelectedPlayerId }) {
  // Grab data from the `getPlayer` query
  const { data: player, isLoading, error } = useGetPlayerQuery(selectedPlayerId, {
    skip: !selectedPlayerId,
  });

  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  const [deletePlayer, { isLoading: isDeleting }] = useDeletePlayerMutation();

  async function removePlayer(id) {
    try {
      await deletePlayer(id);
      setSelectedPlayerId(); // Clear selected player ID after deletion
    } catch (err) {
      console.error("Failed to delete the player:", err);
    }
  }

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPlayerId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  else if (error) {
    $details = <p>Error fetching puppy information: {error.message}</p>
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    $details = (
      <>
        <h3>
          {player.name} #{player.id}
        </h3>
        <p>{player.breed}</p>
        <p>Team {player.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePlayer(player.id)} disabled={isDeleting}>
          {isDeleting ? "Removing..." : "Remove from roster"}
        </button>
        <figure>
          <img src={player.imageUrl} alt={player.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
