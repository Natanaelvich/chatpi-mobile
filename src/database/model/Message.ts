import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Message extends Model {
  static table = 'cars';

  @field('user')
  user!: string;

  @field('toUser')
  toUser!: string;

  @field('message')
  message!: string;

  @field('readed')
  readed!: string;

  @field('id')
  id!: string;

  @field('date')
  date!: Date;

  @field('name')
  name!: string;
}
