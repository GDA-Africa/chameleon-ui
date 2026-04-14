import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("chameleon")
  .description("The Chameleon UI CLI to init and add components.")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize Chameleon UI in your project")
  .action(() => {
    console.log(chalk.green("Initializing Chameleon UI..."));
    // Further implementation for init
    console.log(chalk.blue("Chameleon UI has been initialized successfully!"));
  });

program.parse(process.argv);
