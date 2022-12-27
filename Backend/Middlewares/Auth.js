const { Verify } = require("../Utilities/JWT.js");


async function auth(req, res, next) {

  // const token = req.headers
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0NzVkYzdlOWIzNzc2M2MyZDgyZmQiLCJuYW1lIjoiVW1ha2FudCIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJlbWFpbCI6ImVtYWlsMkBleGFtcGxlLmNvbSIsImlhdCI6MTY2NDM4MjQ3NCwiZXhwIjoxNjY0ODE0NDc0fQ.MYz01oP6m3nr-z3ijKqQgLVZ86f25VXF_a1OH_RaVLs"
    const token = authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = Verify(token);
        req.user = decoded;
        next();
      } catch (err) {
        console.error(err);
        res.send("Unauthorised Request");
      }
    } 
  }else {
    res.status(400).send("Unauthorised User");
  }
    
  }

  module.exports = auth;