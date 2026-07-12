import supabase from "../services/supabase";

export const INITIAL_FACTS = [
  {
    id: 1,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The first computer bug was an actual moth found in a relay.",
    source: "Computer History Museum",
    category: "technology",
    votesInteresting: 72,
    votesMindblowing: 56,
    votesFalse: 1,
  },
  {
    id: 2,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "A day on Venus is longer than a year on Venus.",
    source: "NASA",
    category: "science",
    votesInteresting: 91,
    votesMindblowing: 67,
    votesFalse: 5,
  },
  {
    id: 3,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Compound interest can cause savings to grow faster over long periods.",
    source: "Investopedia",
    category: "finance",
    votesInteresting: 76,
    votesMindblowing: 44,
    votesFalse: 2,
  },
  {
    id: 4,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Cows can form social bonds and may show stress when separated from companions.",
    source: "University of Northampton",
    category: "society",
    votesInteresting: 46,
    votesMindblowing: 25,
    votesFalse: 6,
  },
  {
    id: 5,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The shortest war in recorded history lasted less than an hour.",
    source: "Britannica",
    category: "history",
    votesInteresting: 64,
    votesMindblowing: 39,
    votesFalse: 7,
  },
  {
    id: 6,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The Eiffel Tower can grow slightly taller in hot weather because metal expands.",
    source: "Eiffel Tower Official",
    category: "science",
    votesInteresting: 35,
    votesMindblowing: 21,
    votesFalse: 4,
  },
  {
    id: 7,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The Great Wall of China is not visible from the Moon with the naked eye.",
    source: "NASA",
    category: "history",
    votesInteresting: 70,
    votesMindblowing: 46,
    votesFalse: 22,
  },
  {
    id: 8,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Chess has more possible games than atoms in the observable universe.",
    source: "Chess.com",
    category: "entertainment",
    votesInteresting: 79,
    votesMindblowing: 69,
    votesFalse: 15,
  },
  {
    id: 9,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The human brain uses roughly 20 percent of the body's energy at rest.",
    source: "Harvard Medical School",
    category: "health",
    votesInteresting: 61,
    votesMindblowing: 37,
    votesFalse: 14,
  },
  {
    id: 10,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "A group of flamingos is called a flamboyance.",
    source: "San Diego Zoo Wildlife Alliance",
    category: "culture",
    votesInteresting: 27,
    votesMindblowing: 14,
    votesFalse: 1,
  },
  {
    id: 11,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Lightning can heat the air around it to temperatures hotter than the surface of the Sun.",
    source: "NOAA",
    category: "science",
    votesInteresting: 83,
    votesMindblowing: 62,
    votesFalse: 9,
  },
  {
    id: 12,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The first oranges were green, not orange.",
    source: "Smithsonian Magazine",
    category: "culture",
    votesInteresting: 39,
    votesMindblowing: 19,
    votesFalse: 17,
  },
  {
    id: 13,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "A cloud can weigh more than a million pounds.",
    source: "UCAR Center for Science Education",
    category: "science",
    votesInteresting: 74,
    votesMindblowing: 52,
    votesFalse: 13,
  },
  {
    id: 14,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "The Olympic Games were held in ancient Greece more than two thousand years ago.",
    source: "Olympics",
    category: "sports",
    votesInteresting: 58,
    votesMindblowing: 31,
    votesFalse: 8,
  },
  {
    id: 15,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Electronic mail was developed before the World Wide Web.",
    source: "Internet Society",
    category: "technology",
    votesInteresting: 67,
    votesMindblowing: 48,
    votesFalse: 12,
  },
  {
    id: 16,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Global stock markets react quickly to major interest-rate decisions.",
    source: "International Monetary Fund",
    category: "finance",
    votesInteresting: 54,
    votesMindblowing: 33,
    votesFalse: 4,
  },
  {
    id: 17,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Public libraries provide free access to books, internet services, and community programs.",
    source: "UNESCO",
    category: "society",
    votesInteresting: 49,
    votesMindblowing: 28,
    votesFalse: 11,
  },
  {
    id: 18,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Films with synchronized sound became widely popular in the late 1920s.",
    source: "Academy Museum of Motion Pictures",
    category: "entertainment",
    votesInteresting: 42,
    votesMindblowing: 18,
    votesFalse: 3,
  },
  {
    id: 19,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Handwashing with soap helps reduce the spread of many infections.",
    source: "World Health Organization",
    category: "health",
    votesInteresting: 88,
    votesMindblowing: 72,
    votesFalse: 6,
  },
  {
    id: 20,
    created_at: "2026-07-10 06:13:28.9631+00",
    text: "Breaking news reports may change as more verified information becomes available.",
    source: "Reuters Institute",
    category: "news",
    votesInteresting: 93,
    votesMindblowing: 81,
    votesFalse: 10,
  },
];

export async function resetDatabase() {
  const { error: deleteError } = await supabase
    .from("facts")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error deleting facts:", deleteError);
    throw deleteError;
  }

  const { data, error: insertError } = await supabase
    .from("facts")
    .insert(INITIAL_FACTS)
    .select();

  if (insertError) {
    console.error("Error inserting initial facts:", insertError);
    throw insertError;
  }

  return data;
}
