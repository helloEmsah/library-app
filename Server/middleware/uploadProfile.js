const multer = require("multer");

exports.uploadProfile = (file) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(" ", "-"));
    },
  });

  const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(png|PNG|JPG|JPEG|jpg|jpeg)$/)) {
      req.fileValidationError = {
        message: "Only JPG, JPEG, PNG format are supported.",
      };
      return cb(new Error("Only JPG, JPEG, PNG format are supported."), false);
    }

    cb(null, true);
  };

  const maxSize = 2 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(file);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !err)
        return res.status(400).send({
          message: "Please select an image to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 2MB",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
