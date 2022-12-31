const { Book } = require("../../models");
const booksController = require("../../controllers/booksController");
const router = require("express").Router();

// Matches with "/api/books"
router.route("/").get(booksController.findAll).post(booksController.create);

// Matches with "api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove)
  // .post(booksController.update);


// router.put("/owns/:id", async (req, res) => {
//   try {
//   let book = new Book({
//     title: req.body.title,
//     authors: req.body.authors,
//     description: req.body.description,
//     image: req.body.image,
//     link: req.body.link,
//     owner: req.params.id,
//     currentRenter: null,
//     requester: null
//   })
//   const savedBook = await book.save()
//   console.log(savedBook)
//   } catch (ex) {
//     res.json(ex);
//   }
// });

router.put("/renting/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let book = await Book.findByIdAndUpdate(req.params.id, {
      currentRenter: req.body.currentRenter,
    });
    console.log(book);
    res.json(book);
  } catch (ex) {
    res.json(ex);
  }
});


module.exports = router;


// Old routes

// router.get("/:id", (req, res) => {
//   Book.findById(req.params.id).then((book) => {
//     res.json(book);
//   });
// });

// router.post("/", async (req, res) => {
//   let book = new Book({
//     title: req.body.title,
//     authors: req.body.authors,
//     description: req.body.description,
//     image: req.body.image,
//     link: req.body.link,
//     owner: req.body.owner,
//     currentRenter: req.body.currentRenter,
//     requesters: req.body.requesters,
//   });
//   await book.save();
//   res.json(book);
// });

// router.delete("/:id", (req, res) => {
//   Book.findByIdAndRemove(req.params.id).then((book) => {
//     res.json(book);
//   });
// });

// router.put("/:id", async (req, res) => {
//   try {
//     console.log("Made it here");
//     let book = await Book.findByIdAndUpdate(
//       req.params.id,
//       { $push: { requesters: req.body.userId } },
//       { new: true }
//     );
//     console.log(book);
//     res.json(book);
//   } catch (ex) {
//     res.json(ex);
//   }
// });