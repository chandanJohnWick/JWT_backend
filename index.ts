import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const publickey = req.body.publickey;
  const token = jwt.sign(
    { publickey },
    "secret",
    { expiresIn: "5m" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});

app.post("/protected", (req, res) => {
  console.log(req.body);
  const bearer = req.headers.authorization;
  if (bearer) {
    const token = bearer.split(" ")[1];
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json(decoded);
      }
    });
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000!");
});
