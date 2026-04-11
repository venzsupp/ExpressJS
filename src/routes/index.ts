import { Router } from "express";
import {saveUser} from "../controllers/userController.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    message: "API Index"
  });
});

router.post("/user", saveUser);

export default router;