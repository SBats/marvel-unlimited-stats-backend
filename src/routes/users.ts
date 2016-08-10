import express = require("express");
import Users from '../models/users';

let router: UsersRoutes;
export default class UsersRoutes {
  users: Users = null;

  constructor() {
    router = this;
    router.users = new Users();
  }

  getByEmail(req: any, res: any): void {
    const userEmail = req.params.email;
    if (!userEmail) {
      res.send("Invalid email parameter");
    } else {
      router.users.getByEmail(userEmail)
        .then(user => res.json(user))
        .catch(err => res.send(err));
    }
  }

  create(req: any, res: any): void {
    const userEmail = req.params.email;
    router.users.getByEmail(userEmail)
      .then(user => {
        if (user && user.email === userEmail) {
          throw new Error("User already exists");
        }
      })
      .then(() => router.users.create(userEmail))
      .then(newUser => res.json(newUser))
      .catch(err => res.send(err));
  }

  delete(req: any, res: any): void {
    const userEmail = req.params.email;
    router.users.getByEmail(userEmail)
      .then(user => {
        if (!user || !user.email === userEmail) {
          throw new Error("User does not exists");
        }
      })
      .then(() => router.users.delete(userEmail))
      .then(result => res.json(result))
      .catch(err => res.send(err));
  };
};
