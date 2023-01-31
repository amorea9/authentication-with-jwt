import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

//defines the database table for the user
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userID: string;
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  password: string;
  @Column()
  salt: string;

  //validating incoming password with the password stored in the database
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

//this object is used to create a new user and defines the columns that the user table will have
