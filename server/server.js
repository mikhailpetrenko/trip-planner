const express = require("express");
const cors = require("cors");

const app = express();
const port = 4445;

app.use(express.json());
app.use(cors());

const {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination,
} = require("./controller");

app.get("/api/destinations", getDestinations);
app.post("/api/destinations", addDestination);
app.put("/api/destinations/:id", updateDestination);
app.delete("/api/destinations/:id", deleteDestination);

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error.message);
  });
  