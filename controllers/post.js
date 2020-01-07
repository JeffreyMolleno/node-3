module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");

    const { userid, content } = req.body;

    db.posts
      .save({
        userid,
        content
      })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  get: (req, res) => {
    const db = req.app.get("db");

    db.posts
      .findOne({ id: req.params.id })
      .then(post => {
        console.log(req.query.comments, post.id);

        if (req.query.comments) {
          db.comment
            .find({ postid: post.id })
            .then(comment => {
              console.log(comment);
              post.comments = { comments: comment };
              return res.status(200).json(post);
            })
            .catch(err => {
              console.error(err);
              res.status(500).end();
            });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  getuserpost: (req, res) => {
    const db = req.app.get("db");

    db.posts
      .find({ userid: req.params.userid })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  getall: (req, res) => {
    const db = req.app.get("db");

    db.posts
      .find()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  update: (req, res) => {
    const db = req.app.get("db");

    const { content } = req.body;

    db.posts
      .update({ id: req.params.id }, { content })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
