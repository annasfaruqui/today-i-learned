import { useReducer } from "react";
import toast from "react-hot-toast";
import { useFacts } from "../contexts/FactsContext";
import { CATEGORIES } from "../data/data-categories";
import supabase from "../services/supabase";
import Button from "./Button";

const formInitialState = {
  factText: "",
  source: "",
  category: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateText":
      return { ...state, factText: action.payload };

    case "updateSource":
      return { ...state, source: action.payload };

    case "updateCategory":
      return { ...state, category: action.payload };

    case "resetForm":
      return formInitialState;

    default:
      throw new Error("Invalid action type");
  }
}

function AddFactInput() {
  const { dispatch: globalDispatch, isLoading } = useFacts();
  const [{ factText, source, category }, dispatch] = useReducer(
    reducer,
    formInitialState,
  );
  const textLength = factText.length;

  function handleSubmit(e) {
    e.preventDefault();
    if (factText.length < 5 || source.length < 5 || category === "") {
      toast.error(
        "Fact and source should be more than 5 characters long, and a category must be selected.",
      );
      return;
    }

    async function uploadFact() {
      globalDispatch({ type: "loading" });
      try {
        const { data: newFact, error } = await supabase
          .from("facts")
          .insert([{ text: factText, source, category }])
          .select();

        if (error) throw error;

        globalDispatch({ type: "facts/listUpdated", payload: newFact });
        toast.success("Fact successfully uploaded");
      } catch (err) {
        const friendlyMessage =
          err.message || "Something went wrong while uploading the fact";

        console.error("Upload failed:", err);
        globalDispatch({ type: "rejected", payload: friendlyMessage });
        toast.error(friendlyMessage);
      }
    }

    uploadFact();

    dispatch({ type: "resetForm" });
  }

  return (
    <form
      className="mb-4 flex flex-col gap-4 rounded-2xl bg-definedColor-base2 p-4 font-[Sono] text-sm md:justify-center md:gap-6 lg:flex-row lg:items-center "
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Share a fact with the world..."
          className="input md:w-full"
          disabled={isLoading}
          value={factText}
          onChange={(e) => {
            dispatch({ type: "updateText", payload: e.target.value });
          }}
        />
        <label className="text-lg font-bold">{200 - textLength}</label>
      </div>
      <input
        type="text"
        placeholder="Trustworthy source..."
        className="input"
        disabled={isLoading}
        value={source}
        onChange={(e) =>
          dispatch({ type: "updateSource", payload: e.target.value })
        }
      />
      <select
        className="rounded-full bg-definedColor-base3 p-3"
        disabled={isLoading}
        value={category}
        onChange={(e) =>
          dispatch({ type: "updateCategory", payload: e.target.value })
        }
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((category, idx) => (
          <option key={idx} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <Button
        additionalClassName="gradient-background font-['Coiny']"
        fixedWidth={true}
        cta={true}
        disabled={isLoading}
      >
        Post
      </Button>
    </form>
  );
}

export default AddFactInput;
