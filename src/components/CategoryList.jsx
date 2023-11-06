import Button from "./Button";
import List from "./List";

import { CATEGORIES } from "../data/data-categories";
import { useFacts } from "../contexts/FactsContext";

function CategoryList() {
  const { dispatch } = useFacts();

  function handleFilterByCategory(category) {
    if (category === "all") {
      dispatch({ type: "facts/resetFilter" });
    } else {
      dispatch({ type: "facts/filter", payload: category });
    }
  }

  return (
    <List>
      <Button
        additionalClassName="gradient-background"
        onClick={() => handleFilterByCategory("all")}
      >
        All
      </Button>
      {CATEGORIES.map((category, id) => (
        <li key={id}>
          <Button
            color={category.color}
            onClick={() => handleFilterByCategory(category.name)}
          >
            {category.name}
          </Button>
        </li>
      ))}
    </List>
  );
}

export default CategoryList;
