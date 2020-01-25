import { User } from "./User";
import { Song } from "./Song";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne
} from "typeorm";
import { Length } from "class-validator";

export enum PlaylistType {
  Albumb = 1,
  Collection = 2
}

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

  @Column()
  @Length(1)
  type: PlaylistType;

  @OneToMany(
    type => Song,
    song => song.playlist
  )
  songs: Song[];

  // @OneToOne(type => User, user => user.playlist);
  // author: User;
}
