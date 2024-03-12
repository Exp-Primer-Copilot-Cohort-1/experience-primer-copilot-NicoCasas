// Create web server
// Create a route to handle a post request to /comments
// Create a route to handle a get request to /comments
// Create a route to handle a get request to /comments/:id
// Create a route to handle a put request to /comments/:id
// Create a route to handle a delete request to /comments/:id

const express = require('express');
const app = express();
app.use(express.json());

const comments = [
    { id: 1, username: 'user1', comment: 'This is the first comment' },
    { id: 2, username: 'user2', comment: 'This is the second comment' },
    { id: 3, username: 'user3', comment: 'This is the third comment' }
];

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    res.send(comment);
});

app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        username: req.body.username,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');

    comment.username = req.body.username;
    comment.comment = req.body.comment;
    res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
