import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { IsInt, Length, IsAlpha, IsEmail } from "class-validator";
import bcrypt from "bcryptjs";

export enum UserType {
  AdminUser,
  Author
}

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
  @IsEmail()
  email: string;

  @Column()
  @Length(6)
  password: string;

  @Column({ default: UserType.AdminUser })
  userType: UserType;

  @Column()
  status: number;

  async bcryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    });
  }

  async verifyPassword(password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
