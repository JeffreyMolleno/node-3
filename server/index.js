const express = require("express");
const massive = require("massive");

const users = require("../controllers/users");
const post = require("../controllers/post");
const comments = require("../controllers/comments");

massive({
  host: "localhost",
  port: 5432,
  database: "node3",
  user: "postgres",
  password: "node3db"
})
  .then(db => {
    const app = express();

    app.set("db", db);

    app.use(express.json());

    app.post("/api/users", users.create);
    app.get("/api/users", users.list);
    app.get("/api/users/:id", users.getById);
    app.get("/api/users/:id/profile", users.getProfile);

    app.post("/api/addpost", post.create);
    app.get("/api/post/:id", post.get);
    app.get("/api/post", post.getall);
    app.get("/api/post/user/:userid", post.getuserpost);
    app.put("/api/post/:id/update", post.update);

    app.post("/api/post/addcomment", comments.create);
    app.put("/api/post/comment/:id/update", comments.update);

    const PORT = 3003;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
