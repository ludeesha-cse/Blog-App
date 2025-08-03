import express from "express";
import { deleteUser, getUser, getUsers, signOut, test, updateUser, toggleAdminStatus } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

router.put("/update/:userId", verifyToken, updateUser);

router.delete("/delete/:userId", verifyToken, deleteUser);

router.put("/toggle-admin/:userId", verifyToken, toggleAdminStatus);

router.post("/signout", signOut);

router.get("/getusers",verifyToken, getUsers);

router.get('/:userId', getUser)

export default router;