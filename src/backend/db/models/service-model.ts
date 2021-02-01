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
} from "sequelize-typescript";
import { Service } from "../../../common/api-types";
import AgreementModel from "./agreement-model";

@Table({
  tableName: "service",
  timestamps: true,
})
export default class ServiceModel
  extends Model<ServiceModel>
  implements Service {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public type!: number;

  @AllowNull(false)
  @ForeignKey(() => AgreementModel)
  @Column
  public agreementId!: number;

  @AllowNull(true)
  @Column
  public fee: number;

  @AllowNull(false)
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @Column
  public updatedAt!: Date;
}
