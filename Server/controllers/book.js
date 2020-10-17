const { Book, Category, User } = require("../models");

const joi = require("@hapi/joi");

exports.getAllBook = async (req, res) => {
  try {
    const book = await Book.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "gender",
              "picture",
              "role",
              "password",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "UserId",
          "categoryId",
          "CategoryId",
        ],
      },
    });

    return res.status(200).send({
      message: "All existing book has been loaded",
      data: { book },
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

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "gender",
              "picture",
              "role",
              "password",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "UserId",
          "categoryId",
          "CategoryId",
        ],
      },
      where: {
        id: req.params.id,
      },
    });
    if (book) {
      return res.status(200).send({
        message: "Book has been loaded",
        data: { book },
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exist",
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

exports.addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publication,
      categoryId,
      userId,
      page,
      isbn,
      about,
      file,
      thumbnail,
    } = req.body;

    // const schema = joi.object({
    //   title: joi.string().min(3).required(),
    //   author: joi.string().min(3).required(),
    //   publication: joi.string().min(3).required(),
    //   categoryId: joi.required(),
    //   page: joi.string(),
    //   isbn: joi.number(),
    //   about: joi.string().required(),
    // });
    // const { error } = schema.validate(req.body);
    // if (error) {
    //   return res.status(400).send({
    //     error: {
    //       message: error.details[0].message,
    //     },
    //   });
    // }

    const book = await Book.create({
      ...req.body,
      categoryId,
      userId,
    });

    if (book) {
      const bookResult = await Book.findOne({
        where: {
          id: book.id,
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "gender",
                "picture",
                "role",
                "password",
              ],
            },
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "UserId",
            "categoryId",
            "CategoryId",
          ],
        },
      });
      return res.status(200).send({
        message: "Book added",
        data: { bookResult },
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

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (book) {
      const updatedBook = await Book.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "gender",
                "picture",
                "role",
                "password",
              ],
            },
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "UserId",
            "categoryId",
            "CategoryId",
          ],
        },
      });
      return res.status(200).send({
        message: "Book has been updated",
        data: { updatedBook },
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exists",
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

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (book) {
      const deleteBook = await Book.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        data: {
          message: "Book with corresponding id has been deleted",
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "Book didn't exists",
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
