import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelType: string;

  @Column()
  modelId: number;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @Column()
  name: string;
}
