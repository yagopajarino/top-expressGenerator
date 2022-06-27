let author = require("../models/author");

exports.author_list = function (req, res) {
  res.send("NOT IMPLEMENTED: author list");
};

exports.author_details = function (req, res) {
  res.send("NOT IMPLEMENTED: author detail" + req.param.id);
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
