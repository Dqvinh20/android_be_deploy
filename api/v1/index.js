const router = require("express").Router();
const Passport = require("./utils/passport");

router.use("/auth", require("./routes/auth"));
router.use("/post", Passport.isAuth, require("./routes/post"));

// router.get("/test", (req, res) => {
//   return res.send("test");
//   //   const cloudinary = require("cloudinary").v2;
//   //   // Configuration
//   //   cloudinary.config({
//   //     cloud_name: "dkzlalahi",
//   //     api_key: "237944214249821",
//   //     api_secret: "ZJ9o0WvhD-vXvXMzSxpnvk65sAo",
//   //   });
//   //   // Upload
//   //   const res1 = cloudinary.uploader.upload(
//   //     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
//   //     { public_id: "dog" }
//   //   );
//   //   res1
//   //     .then((data) => {
//   //       console.log(data);
//   //       console.log(data.secure_url);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   //   // Generate
//   //   const url = cloudinary.url("olympic_flag", {
//   //     width: 100,
//   //     height: 150,
//   //     Crop: "fill",
//   //   });
//   //   // The output url
//   //   console.log(url);
//   //   return res.send(url);
//   //   // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
// });

module.exports = router;
