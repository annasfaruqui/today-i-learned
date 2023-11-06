import { createContext, useContext, useReducer } from "react";

const FactsContext = createContext();

const initialState = {
  facts: [],
  filteredFacts: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "facts/loaded":
      return {
        ...state,
        isLoading: false,
        facts: action.payload,
        filteredFacts: action.payload,
      };

    case "facts/listUpdated":
      return {
        ...state,
        isLoading: false,
        facts: [...action.payload, ...state.facts],
        filteredFacts: [...action.payload, ...state.facts],
      };

    case "facts/votesUpdated":
      return {
        ...state,
        facts: state.facts.map((fact) =>
          fact.id === action.payload[0].id ? action.payload[0] : fact,
        ),

        filteredFacts: state.facts.map((fact) =>
          fact.id === action.payload[0].id ? action.payload[0] : fact,
        ),
      };

    case "facts/filter":
      return {
        ...state,
        filteredFacts: state.facts.filter(
          (fact) => fact.category === action.payload,
        ),
      };

    case "facts/resetFilter":
      return { ...state, filteredFacts: state.facts };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Invalid action type");
  }
}

function FactsProvider({ children }) {
  const [{ facts, filteredFacts, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <FactsContext.Provider
      value={{ facts, filteredFacts, isLoading, error, dispatch }}
    >
      {children}
    </FactsContext.Provider>
  );
}

function useFacts() {
  const context = useContext(FactsContext);
  if (context === undefined)
    throw new Error("FactContext was used outside the FactProvider component");

  return context;
}

export { FactsProvider, useFacts };
