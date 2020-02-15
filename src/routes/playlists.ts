import { Router } from "express";

import { PlaylistController } from "../controllers/PlaylistController";

const router = Router();

router.get("/", PlaylistController.getPlaylists);
router.get("/:id", PlaylistController.getPlaylistById);
router.post("/", PlaylistController.createPlaylist);

export default router;
