const { request, response } = require("express");
const sunatApi = require("../apiAxios/apiDniRuc");

const getUserExternos = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const getUserExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const postUserExterno = async (req = request, res = response) => {
  try {
    const { dni } = req.body;
    const resp = await sunatApi.get("/dni", { params: { numero: dni } });
    console.log(resp.data);
    res.json({
      ok: true,
      data: resp.data,
    });
  } catch (error) {
      res.status(400).json({
          ok:false,
          msg:error
      })
  }
};
const putUserExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
const deleteUserExterno = async (req = request, res = response) => {
  res.json({
    ok: true,
  });
};
module.exports = {
  getUserExternos,
  getUserExterno,
  postUserExterno,
  putUserExterno,
  deleteUserExterno,
};
