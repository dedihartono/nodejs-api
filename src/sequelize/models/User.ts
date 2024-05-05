import { Sequelize } from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../../libs';

export interface UserAttributes {
  id?: number;
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  email_verified_at?: Date | null;
  remember_token?: string | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  created_by?: string | null;
  updated_by?: string | null;
  deleted_by?: string | null;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public is_active!: boolean;
  public email_verified_at!: Date | null;
  public remember_token!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
  public created_by!: string | null;
  public updated_by!: string | null;
  public deleted_by!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sequelize = sequelizeConnection;

export function initUserModel(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false, // Assuming timestamps are handled by Sequelize
      tableName: 'users', // Optional: define the table name if different from the model name
      underscored: true, // Optional: use underscored naming for columns (e.g., created_at instead of createdAt)
    },
  );
}

initUserModel(sequelize);
