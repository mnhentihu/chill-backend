const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, contentController.getAllContent);
router.get("/:id", verifyToken, contentController.getContentById);
router.post("/", verifyToken, contentController.createContent);
router.patch("/:id", verifyToken, contentController.updateContent);
router.delete("/:id", verifyToken, contentController.deleteContent);

module.exports = router;
