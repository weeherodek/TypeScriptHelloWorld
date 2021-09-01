import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { dbQuery } from "../database";

const saltRounds = 10;

class UserController {
  async createUser(req: Request, res: Response) {
    const { user, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await dbQuery(
        `INSERT INTO users (user, password) VALUES ("${user}","${hashedPassword}")`
      );
      return res.status(201).json({
        status: "Success",
        message: "Usuário criado!",
      });
    } catch (error) {
      console.log("Erro ao criar usuário.", error);
      return res.status(400).json({
        status: "Fail",
        error: "Error on creating new user",
      });
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await dbQuery(`SELECT * FROM users WHERE id = ${id}`);
      return res.status(200).json({
        status: "Success",
        results: user.length,
        data: user,
      });
    } catch (error) {
      console.log("Error on getting specific users", error);
      return res.status(400).json({
        status: "Fail",
        error: "Error on getting user " + id,
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await dbQuery("SELECT * FROM USERS");
      return res.status(200).json({
        status: "Success",
        results: users.length,
        data: users,
      });
    } catch (error) {
      console.log("Error getting users", error);
      return res.status(400).json({
        status: "Fail",
        error: "Error on getting all users",
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await dbQuery(`delete from users where id = ${id}`);
      return res.status(200).json({
        status: "Success",
        message: `User ${id} deleted with success.`,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        message: `Error on deleting user ${id}, please try again.`,
        error: error,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { user, password } = req.body;
    try {
      if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await dbQuery(
          `update users set password = "${hashedPassword}" where id = ${id}`
        );
      }

      if (user) {
        await dbQuery(
          `update users set user = "${user.toLowerCase()}" where id = ${id}`
        );
      }

      const newUser = await dbQuery(`select * from users where id = ${id}`);
      return res.status(200).json({
        status: "Success",
        message: `User ${id} updated with success.`,
        user: newUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        message: `Failed in updating user ${id}`,
        error,
      });
    }
  }
}

export { UserController };
