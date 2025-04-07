#!/usr/bin/env bun
// ^-- Shebang для прямого запуска через bun run

import type { CliOptions } from './types.js'
import c from 'ansis'
import { Command } from 'commander'
import { version } from '../package.json'
import { generatePrompt } from './generate.js'

const program = new Command()

program
  .name('prompt-gen')
  .description('Generate AI prompts by combining project files.')
  .version(version)
  .option('-o, --output <file>', 'Output file path', 'prompt.txt')
  .option('-d, --directory <dir>', 'Project directory to scan', '.')
  .option('-e, --extensions <extensions>', 'File extensions to include (comma separated)', 'ts,tsx,js,jsx,md,json,yaml,yml,txt,sh,py,go,rb,php,html,css,scss,less') // Еще больше расширений
  .option('-m, --max-size <size>', 'Maximum size of a single file in KB to include', '500')
  .option('--include-paths <patterns>', 'Additional glob patterns to include (comma separated)')
  .option('--exclude-paths <patterns>', 'Additional glob patterns to exclude (comma separated)')
  .option('--no-gitignore', 'Ignore .gitignore file even if it exists')
  .option('--format <format>', 'Output format: flat (default) or structured', 'flat')
  .option('--prefix <text>', 'Add prefix text to the generated prompt')
  .option('--suffix <text>', 'Add suffix text to the generated prompt')
  .option('-y, --yes', 'Skip interactive prompts (if any)', false)
  .action(async (optionsFromCommander) => {
    const options: CliOptions = optionsFromCommander as CliOptions
    try {
      await generatePrompt(options)
    }
    catch (error) {
      console.error(c.red`A top-level error occurred: ${error instanceof Error ? error.message : String(error)}`)
      process.exit(1)
    }
  })

program.parseAsync(process.argv).catch((err) => {
  console.error(c.red`Argument parsing error: ${err.message}`)
  process.exit(1)
})
