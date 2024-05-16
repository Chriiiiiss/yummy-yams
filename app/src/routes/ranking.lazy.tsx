import { createLazyFileRoute } from "@tanstack/react-router";
import { Ranking } from "../pages/Ranking";

export const Route = createLazyFileRoute("/ranking")({
  component: Ranking,
});
