import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@lolu.com",
    password: bcrypt.hashSync("121212", 10),
    isAdmin: true,
  },
  {
    name: "Prem Paul",
    email: "prempal@lolu.com",
    password: bcrypt.hashSync("121212", 10),
    isAdmin: false,
  },
  {
    name: "Ram Paul",
    email: "ravi@lolu.com",
    password: bcrypt.hashSync("121212", 10),
  },
];

export default users;
