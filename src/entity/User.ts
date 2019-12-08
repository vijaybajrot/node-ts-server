import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { IsInt, Length, IsAlpha } from "class-validator";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1)
  firstName: string;

  @Column()
  @Length(1)
  lastName: string;

  @Column()
  @Length(2)
  @IsInt()
  age: number;
}
