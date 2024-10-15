import { useGetPlayersQuery } from "./puppySlice";

/**
 * @component
 * Shows a list of Puppies in the roster.
 * Users can select a Puppy to see more information about it.
 */
export default function PlayerList({ setSelectedPlayerId }) {
  // TODO: Get data from getPuppies query
  const { data: players = [], isLoading, error } = useGetPlayersQuery();

  return (
    <article>
      <h2>Puppy Roster</h2>
      <ul className="players">
        {isLoading && <li>Loading Puppies...</li>}
        {error && <li>Error fetching Puppies: {error.message}</li>}
        {Array.isArray(players) ? (
          players.map((player) => (
            <li key={player.id}>
              <h3>
                {player.name} #{player.id}
              </h3>
              <figure>
                <img src={player.imageUrl} alt={player.name} />
              </figure>
              <button onClick={() => setSelectedPlayerId(player.id)}>
                See details
              </button>
            </li>
          ))
        ) : (
          <li>No puppies available.</li>
        )}
      </ul>
    </article>
  );
}
