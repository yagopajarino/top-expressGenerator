const { nextTick } = require("async");
var BookInstance = require("../models/bookinstance");

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

exports.bookinstance_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

exports.bookinstance_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

exports.bookinstance_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

exports.bookinstance_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

exports.bookinstance_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

exports.bookinstance_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
