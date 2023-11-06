import { useFacts } from "../contexts/FactsContext";

function DatabaseInfo() {
  const { filteredFacts } = useFacts();

  return (
    <p className="mt-2 p-2 pb-4 font-[Sono] text-xl">
      There are {filteredFacts.length} facts in the database for this category.
      Add your own!
    </p>
  );
}

export default DatabaseInfo;
