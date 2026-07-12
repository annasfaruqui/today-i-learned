import { useState } from "react";
import { useFacts } from "../contexts/FactsContext";
import { CATEGORIES } from "../data/data-categories";
import supabase from "../services/supabase";
import Disputed from "./Disputed";
import Tag from "./Tag";
import VoteButton from "./VoteButton";

const VOTES_INTERESTING = "votesInteresting";
const VOTES_MINDBLOWING = "votesMindblowing";
const VOTES_FALSE = "votesFalse";

function Fact({ fact }) {
  const { dispatch } = useFacts();
  const [isLoading, setIsLoading] = useState({
    votesInteresting: false,
    votesMindblowing: false,
    votesFalse: false,
  });

  const votesTrue = fact.votesInteresting + fact.votesMindblowing;

  async function updateVotes(vote) {
    setIsLoading((prev) => ({ ...prev, [vote]: true }));

    try {
      const { data: updatedFact, error } = await supabase
        .from("facts")
        .update({ [vote]: fact[vote] + 1 })
        .eq("id", fact.id)
        .select();

      if (error) throw error;

      dispatch({ type: "facts/votesUpdated", payload: updatedFact });
    } catch (err) {
      const friendlyMessage =
        err.message || "Something went wrong while updating the votes";

      console.error("Vote update failed:", err);
      dispatch({ type: "rejected", payload: friendlyMessage });
    } finally {
      setIsLoading((prev) => ({ ...prev, [vote]: false }));
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
          onClick={() => updateVotes(VOTES_INTERESTING)}
          disabled={isLoading.votesInteresting}
          isLoading={isLoading.votesInteresting}
        />
        <VoteButton
          value={fact.votesMindblowing}
          emoji="🤯"
          onClick={() => updateVotes(VOTES_MINDBLOWING)}
          disabled={isLoading.votesInteresting}
          isLoading={isLoading.votesMindblowing}
        />
        <VoteButton
          value={fact.votesFalse}
          emoji="⛔"
          onClick={() => updateVotes(VOTES_FALSE)}
          disabled={isLoading.votesInteresting}
          isLoading={isLoading.votesFalse}
        />
      </div>
    </div>
  );
}

export default Fact;
