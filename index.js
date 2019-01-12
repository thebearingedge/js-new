const fs = require('fs-extra')
const path = require('path')

const yargs = require('yargs')
const cwd = process.cwd()

yargs
  .command(
    'node <projectName>', 
    'create a node project', 
    ()=>{}, 
    async ({projectName}) => {
      const exists = await fs.pathExists(path.join(cwd, projectName))
      if (exists) {
        console.error('Error: Project folder already exists')
        process.exit(1)
      }
      await fs.mkdir(path.join(cwd, projectName))
  })
  .parse()
