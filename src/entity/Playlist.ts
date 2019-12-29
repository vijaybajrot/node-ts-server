import { Song } from "./Song";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1)
  title: string;

  @Column()
  @Length(1)
  status: number;

  @OneToMany(
    type => Song,
    song => song.playlist
  )
  songs: Song[];
}
