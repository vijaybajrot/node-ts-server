import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { IsInt, Length } from "class-validator";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1)
  name: string;

  @Column()
  @Length(1)
  @IsInt()
  status: number;
}
