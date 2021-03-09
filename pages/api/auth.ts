import path from "path";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const usersPath = path.join(process.cwd(), "users.json");

export default (req: NextApiRequest, res: NextApiResponse) => {
  const isLoggedIn = logIn(req.body.email, req.body.password);
  if (isLoggedIn) {
    res.status(200).json(isLoggedIn);
  } else {
    res.status(401).json(isLoggedIn);
  }
};

function logIn(email: string, password: string) {
  const data = fs.readFileSync(usersPath, "utf-8");
  const users = JSON.parse(data);

  return users[email] === password;
}
