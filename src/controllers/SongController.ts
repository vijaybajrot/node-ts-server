import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete
} from "routing-controllers";

@Controller()
export class SongController {
  @Get("/songs")
  getAll() {
    return "This action returns all songs";
  }

  @Get("/songs/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/songs")
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/songs/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/songs/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
