import express from "express";
import scoreController from "../controllers/scoreController.js";

const router = express.Router();

router.route('/addScore').post(scoreController.addScore);
router.route('/lastScore/:id').get(scoreController.lastScore);
router.route('/highScore/:id').get(scoreController.highScore);

export default router;
