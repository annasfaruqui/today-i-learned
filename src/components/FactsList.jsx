import { useEffect } from "react";

import Fact from "./Fact";
import List from "./List";
import Message from "./Message";
import DatabaseInfo from "./DatabaseInfo";

import supabase from "../services/supabase";

import { useFacts } from "../contexts/FactsContext";

function FactsList() {
  const { filteredFacts, facts, dispatch, isLoading, error } = useFacts();

  useEffect(
    function () {
      async function loadFacts() {
        dispatch({ type: "loading" });

        try {
          const { data, error } = await supabase.from("facts").select("*");

          if (error)
            throw new Error("Something went wrong while loading the data");

          dispatch({ type: "facts/loaded", payload: data });
        } catch (err) {
          console.error(err);
          dispatch({ type: "rejeted", payload: err });
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
