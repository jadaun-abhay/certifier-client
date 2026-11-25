import { hydrateRoot } from "react-dom/client";
import "../styles/index.css";
import { HydratedRouter } from "react-router/dom";

hydrateRoot(document, <HydratedRouter />);
