import Tag from "./Tag";
import VoteButton from "./VoteButton";
import Disputed from "./Disputed";

import { CATEGORIES } from "../data/data-categories";
import supabase from "../services/supabase";
import { useFacts } from "../contexts/FactsContext";
import { useState } from "react";

function Fact({ fact }) {
  const { dispatch } = useFacts();
  const [isLoading, setIsLoading] = useState(false);

  const votesTrue = fact.votesInteresting + fact.votesMindblowing;

  async function updateVotes(vote) {
    setIsLoading(true);

    try {
      const { data: updatedFact, error } = await supabase
        .from("facts")
        .update({ [vote]: fact[vote] + 1 })
        .eq("id", fact.id)
        .select();

      if (error)
        throw new Error("Something went wrong while updating the votes");

      if (!error)
        dispatch({ type: "facts/votesUpdated", payload: updatedFact });

      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <div className="flex flex-col items-end gap-4 rounded-2xl bg-definedColor-base2 p-3 font-[Sono] text-definedColor-base xl:flex-row xl:items-center">
      <p className="self-start text-xl">
        {votesTrue < fact.votesFalse && <Disputed />}
        {fact.text}
        <span className="ml-3 text-definedColor-faded hover:text-blue-500">
          <a href={fact.source} target="_blank" rel="noreferrer">
            (Source)
          </a>
        </span>
      </p>
      <Tag color={CATEGORIES.find((cat) => cat.name === fact.category).color}>
        {fact.category}
      </Tag>
      <div className=" flex gap-4">
        <VoteButton
          value={fact.votesInteresting}
          emoji="👍"
          onClick={() => updateVotes("votesInteresting")}
          disabled={isLoading}
        />
        <VoteButton
          value={fact.votesMindblowing}
          emoji="🤯"
          onClick={() => updateVotes("votesMindblowing")}
          disabled={isLoading}
        />
        <VoteButton
          value={fact.votesFalse}
          emoji="⛔"
          onClick={() => updateVotes("votesFalse")}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

export default Fact;
