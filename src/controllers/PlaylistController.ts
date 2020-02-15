import { Request, Response } from "express";
import { getManager } from "typeorm";
import { validate } from "class-validator";

import { mapErrors } from "../utils";
import { Playlist } from "../entity/Playlist";

import { BaseController } from "./BaseController";

export class PlaylistController extends BaseController {
  static async getPlaylists(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const query = getManager().createQueryBuilder(Playlist, "playlist");
    const playlists = await super.createPagination(query, {
      page,
      perPage: 25
    });

    return res.status(200).json(playlists);
  }

  static async getPlaylistById(req: Request, res: Response): Promise<Response> {
    const playlist = await Playlist.findOne<Playlist>({
      id: parseInt(req.params.id)
    });
    return res.status(200).json(playlist);
  }

  static async createPlaylist(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const playlist = Playlist.create(data);

    const errors = await validate(playlist);
    if (errors.length > 0) {
      return res.status(422).json({
        ok: false,
        message: "Validation failed",
        errors: mapErrors(errors)
      });
    }

    try {
      await playlist.save();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Unable to create playlist"
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Playlist Created"
    });
  }
}
