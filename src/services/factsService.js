import { INITIAL_FACTS } from "../data/data-initialFacts";

const STORAGE_KEY = "today_i_learned_facts";

function getLocalStorageFacts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FACTS));
    return INITIAL_FACTS;
  } catch (err) {
    console.error("Local storage error:", err);
    return INITIAL_FACTS;
  }
}

function setLocalStorageFacts(facts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(facts));
  } catch (err) {
    console.error("Failed to write to local storage:", err);
  }
}

/**
 * Fetch all facts from the JSON API (backed by src/data/facts.json).
 * Falls back to localStorage if API is unavailable.
 */
export async function getFacts() {
  try {
    const res = await fetch("/api/facts");
    if (!res.ok) {
      throw new Error(`Failed to load facts (${res.status})`);
    }
    const data = await res.json();
    setLocalStorageFacts(data);
    return data;
  } catch (err) {
    console.warn("API unavailable, falling back to local storage:", err);
    return getLocalStorageFacts();
  }
}

/**
 * Create a new fact and append to facts.json.
 * Returns an array containing the new fact [newFact] to maintain context contract.
 */
export async function createFact({ text, source, category }) {
  try {
    const res = await fetch("/api/facts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, source, category }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to create fact (${res.status})`,
      );
    }

    const data = await res.json();
    // Update local storage cache
    const current = getLocalStorageFacts();
    setLocalStorageFacts([...data, ...current]);
    return data;
  } catch (err) {
    console.warn(
      "API error creating fact, falling back to local storage:",
      err,
    );
    const newFact = {
      id: Date.now(),
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      created_at: new Date().toISOString(),
    };
    const current = getLocalStorageFacts();
    setLocalStorageFacts([newFact, ...current]);
    return [newFact];
  }
}

/**
 * Upvote a fact by id and vote category.
 * Returns an array containing the updated fact [updatedFact].
 */
export async function updateFactVote(id, voteType) {
  try {
    const res = await fetch("/api/facts", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, vote: voteType }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to update vote (${res.status})`,
      );
    }

    const data = await res.json();
    const current = getLocalStorageFacts();
    const updated = current.map((f) => (f.id === data[0].id ? data[0] : f));
    setLocalStorageFacts(updated);
    return data;
  } catch (err) {
    console.warn("API error voting, falling back to local storage:", err);
    const current = getLocalStorageFacts();
    let updatedFact = null;
    const updated = current.map((f) => {
      if (f.id === id) {
        updatedFact = { ...f, [voteType]: (f[voteType] || 0) + 1 };
        return updatedFact;
      }
      return f;
    });
    if (!updatedFact) {
      throw new Error("Fact not found");
    }
    setLocalStorageFacts(updated);
    return [updatedFact];
  }
}

/**
 * Reset the facts database back to INITIAL_FACTS.
 */
export async function resetDatabase() {
  try {
    const res = await fetch("/api/facts/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initialFacts: INITIAL_FACTS }),
    });

    if (!res.ok) {
      throw new Error(`Failed to reset facts database (${res.status})`);
    }

    const data = await res.json();
    setLocalStorageFacts(data);
    return data;
  } catch (err) {
    console.warn("API reset error, falling back to local storage:", err);
    setLocalStorageFacts(INITIAL_FACTS);
    return INITIAL_FACTS;
  }
}
