import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { IsInt, Length } from "class-validator";
import { User } from "./User";
import { Playlist } from "./Playlist";
import { Tag } from "./Tag";

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

  @OneToOne(() => User)
  @JoinColumn()
  author: User;

  @ManyToMany(type => Tag)
  @JoinTable({ name: "song_tags" })
  tags: Tag[];
}
