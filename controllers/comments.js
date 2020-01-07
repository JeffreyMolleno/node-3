module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");

    const { userid, postid, comment } = req.body;

    db.comment
      .save({
        userid,
        postid,
        comment
      })
      .then(comment => {
        res.status(201).json(comment);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  update: (req, res) => {
    const db = req.app.get("db");

    const { comment } = req.body;

    db.comment
      .update({ id: req.params.id }, { comment })
      .then(comment => {
        res.status(200).json(comment);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
