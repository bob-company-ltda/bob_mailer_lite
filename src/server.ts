import { app } from "./app";
import { Command } from 'commander';
const program = new Command();

program
.option('-p, --port <number>', 'Api port server', '3333');
program.parse();

const options = program.opts();
app.listen(options.port, () => console.log(`Server is running on port ${options.port}! 🚀`));