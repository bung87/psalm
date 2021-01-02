#!/usr/bin/env node
import path from "path";
const args = process.argv.slice(2);
import { Plop, run } from "plop";
import minimist from "minimist";
const argv = minimist(args);

Plop.launch(
  {
    cwd: argv.cwd,
    // In order for `plop` to always pick up the `plopfile.js` despite the CWD, you must use `__dirname`
    configPath: require.resolve(path.join(__dirname,"./plopfile")),
    require: argv.require,
    completion: argv.completion,
    // This will merge the `plop` argv and the generator argv.
    // This means that you don't need to use `--` anymore
  },
  (env) => {
    const options = {
      ...env,
      dest: process.cwd() // this will make the destination path to be based on the cwd when calling the wrapper
    }
    return run(options, undefined, true)}
);
