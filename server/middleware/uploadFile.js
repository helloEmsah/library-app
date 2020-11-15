var multer = require("multer");

exports.uploadFile = (fileName) => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/file");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const pdfFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.PDF|pdf|epub|EPUB|$/)) {
      req.fileValidationError = {
        message: "Only PDF or EPUB file are allowed",
      };
      return cb(new Error("Only PDF or EPUB file are allowed"));
    }
    cb(null, true);
  };

  const maxSize = 20 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter: pdfFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(fileName);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      if (!req.file && !err)
        return res.status(400).send({
          message: "Please select file to upload",
        });

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 20mb",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
