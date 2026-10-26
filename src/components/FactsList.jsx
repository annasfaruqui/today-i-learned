import { useEffect } from "react";
import { useFacts } from "../contexts/FactsContext";
import { getFacts } from "../services/factsService";
import DatabaseInfo from "./DatabaseInfo";
import Fact from "./Fact";
import List from "./List";
import Message from "./Message";

function FactsList() {
  const { filteredFacts, facts, dispatch, isLoading, error } = useFacts();

  useEffect(
    function () {
      async function loadFacts() {
        dispatch({ type: "loading" });

        try {
          const data = await getFacts();

          dispatch({ type: "facts/loaded", payload: data });
        } catch (err) {
          console.error(err);
          dispatch({
            type: "rejected",
            payload:
              err.message || "Something went wrong while loading the data",
          });
        }
      }

      loadFacts();
    },
    [dispatch],
  );

  return (
    <article className="h-full w-full">
      {isLoading && !error && <Message message="Loading..." uppercase={true} />}
      {error && !isLoading && (
        <Message message="💥 Something went wrong" uppercase={true} />
      )}
      {!error && !isLoading && facts.length === 0 && (
        <Message message="There are no facts in the database. Start by adding your own facts..." />
      )}
      {!error &&
        !isLoading &&
        facts.length > 0 &&
        filteredFacts.length === 0 && (
          <Message message="There are no facts in the database for this category" />
        )}
      {!isLoading && !error && facts.length > 0 && (
        <>
          <List>
            {filteredFacts.map((fact, idx) => (
              <li key={idx}>
                <Fact fact={fact} />
              </li>
            ))}
          </List>
          <DatabaseInfo />
        </>
      )}
    </article>
  );
}

export default FactsList;
