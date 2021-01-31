import {
  AllowNull,
  DataType,
  Column,
  Model,
  ForeignKey,
  Table,
  Unique,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Agreement, AgreementType } from '../../../common/api-types';
import CustomerModel from './customer-model';

@Table({
  tableName: 'agreement',
  timestamps: true,
})
export default class AgreementModel extends Model<AgreementModel> implements Agreement {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public type!: AgreementType;

  @AllowNull(false)
  @ForeignKey(() => CustomerModel)
  @Column
  public customerId!: number;

  @AllowNull(false)
  @Column
  public start!: Date;

  @AllowNull(true)
  @Column
  public end?: Date;

  @AllowNull(false)
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @Column
  public updatedAt!: Date;
}
