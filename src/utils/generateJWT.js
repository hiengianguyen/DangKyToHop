const jwt = require("jsonwebtoken");

function generateJWT(apiKey, apiSecret, sub) {
  const payload = {
    iss: apiKey,
    sub: sub,
    // Có thể thêm `aud` (audience) nếu cần theo tài liệu
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // Token sống 1h
  };

  return jwt.sign(payload, apiSecret, { algorithm: "HS256" });
}

module.exports = { generateJWT };
