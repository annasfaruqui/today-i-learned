import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const factsFilePath = path.resolve(__dirname, "../src/data/facts.json");

// Serial queue for atomic file read/write operations
let fileQueue = Promise.resolve();

function withFileLock(action) {
  const result = fileQueue.then(action);
  fileQueue = result.catch(() => {});
  return result;
}

async function readFactsFile() {
  try {
    const rawData = await fs.readFile(factsFilePath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(factsFilePath, "[]", "utf-8");
      return [];
    }
    throw err;
  }
}

async function writeFactsFile(facts) {
  await fs.writeFile(factsFilePath, JSON.stringify(facts, null, 2), "utf-8");
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error("Request payload too large"));
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", (err) => reject(err));
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}

function createApiMiddleware() {
  return async (req, res, next) => {
    const parsedUrl = new URL(req.url, "http://localhost");
    const pathname = parsedUrl.pathname;

    if (!pathname.startsWith("/api/facts")) {
      return next();
    }

    try {
      // 1. Reset facts: POST /api/facts/reset
      if (req.method === "POST" && pathname === "/api/facts/reset") {
        const body = await parseJsonBody(req);
        const initialFacts = body.initialFacts;

        const resetData = await withFileLock(async () => {
          let dataToReset = initialFacts;
          if (!dataToReset || !Array.isArray(dataToReset)) {
            dataToReset = await readFactsFile();
          }
          await writeFactsFile(dataToReset);
          return dataToReset;
        });

        return sendJson(res, 200, resetData);
      }

      // 2. GET /api/facts
      if (req.method === "GET" && pathname === "/api/facts") {
        const facts = await withFileLock(() => readFactsFile());
        return sendJson(res, 200, facts);
      }

      // 3. POST /api/facts
      if (req.method === "POST" && pathname === "/api/facts") {
        const body = await parseJsonBody(req);
        const { text, source, category } = body;

        if (!text || !source || !category) {
          return sendError(res, 400, "Text, source, and category are required");
        }

        const newFact = {
          id: Date.now(),
          text: String(text).trim(),
          source: String(source).trim(),
          category: String(category).trim(),
          votesInteresting: 0,
          votesMindblowing: 0,
          votesFalse: 0,
          created_at: new Date().toISOString(),
        };

        const result = await withFileLock(async () => {
          const facts = await readFactsFile();
          const updatedFacts = [newFact, ...facts];
          await writeFactsFile(updatedFacts);
          return [newFact];
        });

        return sendJson(res, 201, result);
      }

      // 4. PATCH /api/facts or /api/facts/:id
      if (
        req.method === "PATCH" &&
        (pathname === "/api/facts" || pathname.startsWith("/api/facts/"))
      ) {
        const body = await parseJsonBody(req);

        let factId = body.id;
        if (!factId && pathname.startsWith("/api/facts/")) {
          factId = pathname.replace("/api/facts/", "");
        }

        if (factId === undefined || factId === null || factId === "") {
          return sendError(res, 400, "Fact id is required");
        }

        const result = await withFileLock(async () => {
          const facts = await readFactsFile();
          const factIndex = facts.findIndex(
            (f) => String(f.id) === String(factId),
          );

          if (factIndex === -1) {
            return null;
          }

          const targetFact = { ...facts[factIndex] };

          if (body.vote) {
            targetFact[body.vote] = (targetFact[body.vote] || 0) + 1;
          } else {
            [
              "votesInteresting",
              "votesMindblowing",
              "votesFalse",
              "text",
              "source",
              "category",
            ].forEach((key) => {
              if (body[key] !== undefined) {
                targetFact[key] = body[key];
              }
            });
          }

          facts[factIndex] = targetFact;
          await writeFactsFile(facts);
          return [targetFact];
        });

        if (!result) {
          return sendError(res, 404, "Fact not found");
        }

        return sendJson(res, 200, result);
      }

      return sendError(res, 405, "Method not allowed");
    } catch (err) {
      console.error("API error:", err);
      return sendError(res, 500, err.message || "Internal server error");
    }
  };
}

export function factsApiPlugin() {
  const middleware = createApiMiddleware();
  return {
    name: "facts-api-plugin",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
