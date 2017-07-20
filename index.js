const express = require("express");
const app = express();


app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.status(404).send("404: Resource not found!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});