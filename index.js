// index.js
import app from "./api/index";

// bungkus express app jadi handler untuk Vercel
export default function handler(req, res) {
    return app(req, res);
}
