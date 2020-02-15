import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Length } from "class-validator";

import { User } from "./User";
import { Song } from "./Song";

export enum PlaylistType {
  Albumb = 1,
  Collection = 2
}

export enum PlaylistStatus {
  Active = 1,
  Inactive = 2
}

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1)
  title: string;

  @Column({ default: PlaylistStatus.Active })
  status: number;

  @Column({ default: PlaylistType.Albumb })
  type: PlaylistType;

  @OneToMany(
    type => Song,
    song => song.playlist
  )
  songs: Song[];

  @Column({ nullable: true })
  authorId: number;

  @OneToOne(() => User)
  @JoinColumn()
  author: User;
}
