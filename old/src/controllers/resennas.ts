import { Request, Response, NextFunction } from 'express';
import User, { UserMap } from '../db/user.model';
import sequelize from '../db/database';

const createResenna = async (req: Request, res: Response, next: NextFunction) => {
    console.log("===>", req.body);
    return res.status(200).json({ message: "malba disp", params: req.body });
}

const readResennas = async (req: Request, res: Response, next: NextFunction) => {
    UserMap(sequelize);
    const result = await User.findAll();

    return res.status(200).json({ message: "malba disp" });
}

const readResenna = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "malba disp" });
}

const updateResenna = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "malba disp" });
}
const deleteResenna = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "malba disp" });
}

export default { createResenna, readResennas, readResenna, updateResenna, deleteResenna };
