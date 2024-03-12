// Create a web server that listens to requests on port 3000 and serves the following responses:
// - GET /comments - returns a list of comments in the following format: { comments: [...] }. The list of comments can be stored in memory as an array of objects.
// - POST /comments - creates a new comment. The request body will contain the comment object in JSON format. The server should add it to the list of comments and return the comment object with its ID. The ID of the comment can be generated using a unique ID generation library.
// - PUT /comments/:id - updates the comment with the specified ID. The request body will contain the comment object in JSON format. The server should update the comment with the new information and return the updated comment object.
// - DELETE /comments/:id - deletes the comment with the specified ID. The server should return an empty response with status 204.
// - Bonus: Validate that the request body has the correct shape when creating or updating a comment. If the request body is invalid, the server should return a 400 status code.

const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let comments = [];

app.get('/comments', (req, res) => {
  res.json({ comments });
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  const id = uuid.v4();
  comments.push({ ...comment, id });
  res.json({ ...comment, id });
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments[index] = { ...comments[index], ...req.body };
    res.json(comments[index]);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}
);
