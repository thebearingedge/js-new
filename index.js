const path = require("path");
const fs = require("fs-extra");
const yargs = require("yargs");

const cwd = process.cwd();

yargs
  .command(
    "node <projectName>",
    "create a node project",
    () => {},
    async ({ projectName }) => {
      const exists = await fs.pathExists(path.join(cwd, projectName));
      if (exists) {
        console.error("Error: Project folder already exists");
        process.exit(1);
      }
      const projectPath = path.join(cwd, projectName);
      await fs.mkdir(projectPath);
      const packageJson = JSON.stringify(
        {
          name: projectName,
          version: "1.0.0",
          main: "index.js",
          scripts: {
            start: "node ."
          }
        },
        null,
        2
      );
      await fs.writeFile(path.join(projectPath, "package.json"), packageJson);
      const indexJs = "console.log('Hello, World!')";
      await fs.writeFile(path.join(projectPath, "index.js"), indexJs);
    }
  )
  .parse();
