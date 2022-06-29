const { nextTick } = require("async");
let BookInstance = require("../models/bookinstance");
let Book = require("../models/book");
const { body, validationResult } = require("express-validator");
const bookinstance = require("../models/bookinstance");
const async = require("async");

exports.bookinstance_list = function (req, res) {
  BookInstance.find()
    .populate("book")
    .exec(function (err, list) {
      if (err) {
        return nextTick(err);
      }
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list,
      });
    });
};

exports.bookinstance_detail = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function (err, bookinstance) {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        let err = new Error("Book instante not found");
        res.status = 404;
        return next(err);
      }
      res.render("bookinstance_detail", {
        title: "Copy: " + bookinstance.book.title,
        bookinstance: bookinstance,
      });
    });
};

exports.bookinstance_create_get = function (req, res, next) {
  Book.find().exec(function (err, books) {
    if (err) {
      return next(err);
    }
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    });
  });
};

exports.bookinstance_create_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: "true" })
    .isISO8601()
    .toDate(),

  function (req, res, next) {
    const errors = validationResult(req);

    let bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back ? req.body.due_back : Date.now(),
    });

    if (!errors.isEmpty()) {
      Book.find({}, "title").exec(function (err, books) {
        if (err) {
          return next(err);
        }
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          bookinstance: bookInstance,
        });
      });
      return;
    } else {
      bookInstance.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(bookInstance.url);
      });
    }
  },
];

exports.bookinstance_delete_get = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function (err, bookInstance) {
      if (err) {
        return next(err);
      }
      res.render("bookinstance_delete", {
        title: "Delete BookInstance",
        bookInstance: bookInstance,
      });
    });
};

exports.bookinstance_delete_post = function (req, res, next) {
  BookInstance.findByIdAndDelete(req.params.id, {}, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/catalog/bookinstances");
  });
};

exports.bookinstance_update_get = function (req, res, next) {
  async.parallel(
    {
      bookinstance: function (callback) {
        BookInstance.findById(req.params.id).populate("book").exec(callback);
      },
      books: function (callback) {
        Book.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("bookinstance_form", {
        title: "Update BookInstance",
        book_list: results.books,
        bookinstance: results.bookinstance,
        selected_book: results.bookinstance.book._id,
      });
    }
  );
};

exports.bookinstance_update_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: "true" })
    .isISO8601()
    .toDate(),

  function (req, res, next) {
    const errors = validationResult(req);

    let bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back ? req.body.due_back : Date.now(),
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      Book.find({}, "title").exec(function (err, books) {
        if (err) {
          return next(err);
        }
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          bookinstance: bookInstance,
        });
      });
      return;
    } else {
      BookInstance.findByIdAndUpdate(
        req.params.id,
        bookInstance,
        {},
        function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/catalog/bookinstances");
        }
      );
    }
  },
];
