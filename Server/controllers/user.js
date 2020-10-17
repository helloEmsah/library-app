const { User } = require("../models");

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.status(200).send({
      message: "All existing user has been loaded successfully!",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      return res.status(200).send({
        message: `User has been loaded successfully`,
        data: { user },
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      const deleteUser = await user.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        message: "User with corresponding id has been deleted",
        data: {
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
