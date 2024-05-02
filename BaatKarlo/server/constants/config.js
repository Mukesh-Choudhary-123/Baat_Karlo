const corsOption = {
  origin: [
    "http://localhost:5173",
    "http://localhost:8000",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
const BAATKARLO_TOKEN = "baatkarlo-token";

export { corsOption, BAATKARLO_TOKEN };
