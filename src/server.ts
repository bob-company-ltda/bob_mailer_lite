import { app } from "./app";
import { argv } from "node:process";

const port = argv?.[argv.length - 1] ?? '3333'
app.listen(port, () =>
  console.log(`Server is running on port ${port}! 🚀`)
);
