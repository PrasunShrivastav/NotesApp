import ratelimit from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("Hello World"); //change after auth implementation
    if (!success) {
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default rateLimiter;
