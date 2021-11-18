const app = require("./src/app.js");

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
});
