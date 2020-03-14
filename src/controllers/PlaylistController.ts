import { Request, Response } from "express";
import { getManager } from "typeorm";
import { validate } from "class-validator";
import { Controller, Get, Post, Req, Res, Param } from "routing-controllers";

import { mapErrors } from "../utils";
import { Playlist } from "../entity/Playlist";

import { BaseController } from "./BaseController";

@Controller("/playlists")
export class PlaylistController extends BaseController {
  @Get()
  async getPlaylists(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const query = getManager().createQueryBuilder(Playlist, "playlist");
    const playlists = await this.buildPagination(query, {
      page,
      perPage: 25
    });

    return res.status(200).json(playlists);
  }

  @Get("/:id")
  async getPlaylistById(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const playlist = await Playlist.findOne<Playlist>({
      id
    });
    return res.status(200).json(playlist);
  }

  @Post()
  async createPlaylist(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
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
