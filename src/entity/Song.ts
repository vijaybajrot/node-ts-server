import { Playlist } from "./Playlist";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { IsInt, Length } from "class-validator";

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1)
  title: string;

  @Column()
  @Length(1)
  @IsInt()
  status: number;

  @Column()
  @Length(1)
  playlistId: number;

  @ManyToOne(
    type => Playlist,
    playlist => playlist.songs
  )
  playlist: Playlist;
}
