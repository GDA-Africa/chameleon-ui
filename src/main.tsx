import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { RenderView } from "./app/pages/render.tsx";
import { PlayView } from "./app/pages/play.tsx";
import "./styles/index.css";

// F66/F68 (Phase 13): bare spec canvas + playground, no workshop chrome.
const path = window.location.pathname.replace(/\/+$/, "");
const view = path === "/render" ? <RenderView /> : path === "/play" ? <PlayView /> : <App />;

createRoot(document.getElementById("root")!).render(view);
