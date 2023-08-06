import { json } from "express/lib/response";
import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}
export function getById(id) {
  const data = getAll();
  return data.find((p) => p.id == id);
}
export function getByEmail(email) {
  const data = getAll();
  return data.find((p) => p.email.toLowerCase() === email.toLowerCase());
}
export async function verifyPass(hashedPass, password) {
  const valid = await compare(password, hashedPass);
  return valid;
}
export async function save(email, password) {
  const data = getAll();
  const found = getByEmail(email);
  if (found) {
    throw new Error("User already exists");
  }
  const hashedPass = await hash(password, 12);
  data.push({
    id: data.length + 1,
    email,
    password: hashedPass,
  });
  fs.writeFileSync(filePath, JSON.stringify(data));
}
