const { Library, Book, User } = require("../models");

// exports.getAllLibrary = async (req, res) => {
//   try {
//     const library = await Library.findAll({
//       where: { userId: req.user.id },
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "UserId", "BookId"],
//       },
//       include: [
//         {
//           model: User,
//           as: "user",
//           attributes: {
//             exclude: ["createdAt", "updatedAt"],
//           },
//         },

//         {
//           model: Book,
//           as: "book",
//           attributes: {
//             exclude: ["createdAt", "updatedAt"],
//           },
//         },
//       ],
//     });

//     return res.status(200).send({
//       message: "All existing library has been loaded successfully!",
//       data: { library },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       error: {
//         message: "Internal Server Error",
//       },
//     });
//   }
// };

exports.getAllLibrary = async (req, res) => {
  try {
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"],
    //   },
    //   include: [
    //     {
    //       model: User,
    //       as: "libraryUser",
    //       attributes: {
    //         exclude: ["createdAt", "updatedAt"],
    //       },
    //     },

    //     {
    //       model: Book,
    //       as: "libraryBook",
    //       attributes: {
    //         exclude: ["createdAt", "updatedAt"],
    //       },
    //     },
    //   ],
    // });
    const { id } = req.user;
    const data = await Library.findAll({
      where: { userId: req.user.id },
      include: {
        model: Book,
        as: "libraryBook",
        include: {
          model: User,
          as: "libraryUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        //attribute here
      },
      where: {
        userId: id,
      },
      //attribute here
    });

    return res.status(200).send({
      message: "All existing book has been loaded",
      data: { data },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.getLibrary = async (req, res) => {
  try {
    const { id } = req.params;
    const library = await Library.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (library) {
      return res.status(200).send({
        message: "Library with corresponding id has been loaded",
        data: library,
      });
    } else {
      return res.status(404).send({
        message: "Library didn't exist",
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

exports.addLibrary = async (req, res) => {
  try {
    const library = await Library.create({ ...req.body, userId: req.user.id });

    return res.status(200).send({
      message: "Library added successfully",
      data: { library },
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

exports.deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findOne({
      where: {
        bookId: req.params.id,
        userId: req.params.id,
      },
    });

    if (library) {
      const deleteLibrary = await Library.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        data: {
          message: "Library with corresponding id has been deleted",
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "Library didn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: { message: "Server Error" } });
  }
};
