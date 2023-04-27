const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const ServerRepository = require("../repository/server");
const { ObjectId } = require("mongodb");

exports.GetAll = async (req, res, next) => {
  let result = await ServerRepository.getAllServers();

  response(res, result);
};

exports.Update = async (req, res, next) => {
  let params = req.params;
  if (req.body.name == null || req.body.url == null) {
    response(res, null, ResponseCode.BadRequest);
    return;
  }

  let query = {
    name: req.body.name,
    url: req.body.url
  };
  let result = await ServerRepository.updateServer(params.id, query);

  response(res, result);
};

exports.Insert = async (req, res, next) => {
  if (req.body.name == null || req.body.url == null) {
    response(res, null, ResponseCode.BadRequest);
    return;
  }
  let data = { name: req.body.name, url: req.body.url };
  let result = await ServerRepository.createServer(data);
  response(res, req.body);
};

exports.Delete = async (req, res, next) => {
  let params = req.params;
  let result = await ServerRepository.deleteServer(params.id);
  response(res, req.body);
};
