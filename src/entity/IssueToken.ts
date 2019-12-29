import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

export enum TokenType {
  ACCESS_TOKEN = 1,
  REFRESH_TOKEN = 2
}

@Entity()
export class IssueToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  tokenType: TokenType;

  @Column("text")
  token: string;

  @Column()
  issueAt: Date;
}
