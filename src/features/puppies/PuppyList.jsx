import { useGetPuppiesQuery } from "./puppySlice";

/**
 * @component
 * Shows a list of Players in the roster.
 * Users can select a Player to see more information about it.
 */
export default function puppyList({ setPuppyId }) {
  // TODO: Get data from getPlayers query
  const { data: puppies = [], isLoading, error } = useGetPuppiesQuery();

  return (
    <article>
      <h2>Puppy Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading Puppies...</li>}
        {error && <li>Error fetching Puppies: {error.message}</li>}
        {Array.isArray(puppies) ? (
          puppies.map((puppy) => (
            <li key={puppy.id}>
              <h3>
                {puppy.name} #{puppy.id}
              </h3>
              <figure>
                <img src={puppy.imageUrl} alt={puppy.name} />
              </figure>
              <button onClick={() => setSelectedPuppyId(puppy.id)}>
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
