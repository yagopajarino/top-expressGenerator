let Author = require("../models/author");
let Book = require("../models/book");
let async = require("async");

exports.author_list = function (req, res, next) {
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec(function (err, list) {
      if (err) {
        return next(err);
      }
      res.render("author_list", { title: "Author List", author_list: list });
    });
};

exports.author_details = function (req, res) {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },
      author_books: function (callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        let err = new Error("Author not found");
        res.status = 404;
        return next(err);
      }
      res.render("author_detail", {
        title: "Author Detail",
        author: results.author,
        author_books: results.author_books,
      });
    }
  );
};

exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: author create GET");
};

exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: author create POST");
};

exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: author delete GET");
};

exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: author delete POST");
};

exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: author update GET");
};

exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: author update POST");
};
