import express from "express";
import cors from "cors";
import { router } from "./routes";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);

server.use(express.json());

server.use(router);

export { server };
