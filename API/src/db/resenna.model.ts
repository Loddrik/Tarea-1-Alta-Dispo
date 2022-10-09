import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Resenna extends Model {
    public id?:       number;
    public userId:    number;
    public productId: string;
    public score:     number;
    public body:      number;
}

export const ResennaMap = (sequelize: Sequelize) => {
    User.init({
	id: {
