import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IsOptional, IsString } from 'class-validator';

export abstract class BaseResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsString()
  id: string;

  @Index()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Index()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}