const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();
const root = `${__dirname}/dist`;
const port = process.env.PORT || 8080;
app.use(express.static(root));
app.use(fallback('index.html', { root }));
app.listen(port, () => console.log(`Server is listening on port ${port}.`));
