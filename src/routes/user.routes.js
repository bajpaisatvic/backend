import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeUserPassword,
  getCurrentUser,
  refreshAccessToken,
  registerUser,
  updateUserAvatar,
  updateUserCoverImage,
  updateUserDetails,
  userLogin,
  userLogout,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(userLogin);

// Secured Routes
router.route("/logout").post(verifyJWT, userLogout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-password").post(verifyJWT, changeUserPassword);
router.route("/get-user").get(verifyJWT, getCurrentUser);
router.route("/update-details").post(verifyJWT, updateUserDetails);
router
  .route("/update-avatar")
  .post(verifyJWT, upload.single(), updateUserAvatar);
router
  .route("update-cover")
  .post(verifyJWT, upload.single(), updateUserCoverImage);

export { router };
