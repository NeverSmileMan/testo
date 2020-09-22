const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/list", (req, res) => {
        let query = req.query.searchIndex;
        if (query) query = '?searchIndex=' + encodeURI(query);
        else query = '';
				fetch(`http://10.13.16.80:4444/list${query}`)
                    .then(response => response.json())
                    .then(result => res.json(result))
                    .then(() => res.end())
					.catch((e)=>console.log(e));
});

app.get("/search", (req, res) => {
    fetch(`http://10.13.16.80:4444/search?id=${encodeURI(req.query.id)}`)
        .then(response => response.json())
        .then(result => res.json(result))
        .then(() => res.end())
        .catch((e)=>console.log(e));
});

app.listen(9000);
