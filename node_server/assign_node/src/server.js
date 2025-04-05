import app from "./app.js";

const port = 3000;

app.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on ${address}`);
});
