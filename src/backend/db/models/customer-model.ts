import { AllowNull, Column, Model, Table, Unique, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Customer } from '../../../common/api-types';
import AgreementModel from './agreement-model';

@Table({
  tableName: 'customer',
  timestamps: true,
})
export default class CustomerModel extends Model<CustomerModel> implements Customer {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Unique
  @AllowNull(false)
  @Column
  public identificationNumber!: string;

  @AllowNull(false)
  @Column
  public name!: string;

  @HasMany(() => AgreementModel)
  public agreements!: AgreementModel[];

  @AllowNull(false)
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @Column
  public updatedAt!: Date;
}
