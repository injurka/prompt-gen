import type { CliOptions } from './types'
import c from 'ansis'
import { Command } from 'commander'
import { cosmiconfig } from 'cosmiconfig'
import { version } from '../package.json'
import { generatePrompt } from './generate'

const program = new Command()

// Create a cosmiconfig explorer
const explorer = cosmiconfig('prompt-gen')

program
  .name('prompt-gen')
  .description('Generate AI prompts by combining project files.')
  .version(version)
  .option('-o, --output <file>', 'Output file path')
  .option('-d, --directory <dir>', 'Project directory to scan')
  .option(
    '-e, --extensions <extensions>',
    'File extensions to include (comma separated)',
  )
  .option(
    '-m, --max-size <size>',
    'Maximum size of a single file in KB to include',
  )
  .option(
    '--include-paths <patterns>',
    'Additional glob patterns to include (comma separated)',
  )
  .option(
    '--exclude-paths <patterns>',
    'Additional glob patterns to exclude (comma separated)',
  )
  .option('--no-gitignore', 'Ignore .gitignore file even if it exists')
  .option('--format <format>', 'Output format: flat (default) or structured')
  .option('--prefix <text>', 'Add prefix text to the generated prompt')
  .option('--suffix <text>', 'Add suffix text to the generated prompt')
  .option('-y, --yes', 'Skip interactive prompts (if any)', false)
  .action(async (optionsFromCommander: CliOptions) => {
    try {
      // Search for a configuration file
      const result = await explorer.search()
      const optionsFromConfig: CliOptions = result ? result.config : {}

      // Define default options
      const defaultOptions: CliOptions = {
        output: 'prompt.txt',
        directory: '.',
        extensions:
          'ts,tsx,js,jsx,md,json,yaml,yml,txt,sh,py,go,rb,php,html,css,scss,less',
        maxSize: '500',
        gitignore: true,
        format: 'flat',
      }

      // Merge options with precedence: Commander > Config File > Defaults
      const finalOptions: CliOptions = {
        ...defaultOptions,
        ...optionsFromConfig,
        ...optionsFromCommander,
      }

      await generatePrompt(finalOptions)
    }
    catch (error) {
      console.error(
        c.red`A top-level error occurred: ${error instanceof Error ? error.message : String(error)
          }`,
      )
      process.exit(1)
    }
  })

program.parseAsync(process.argv).catch((err) => {
  console.error(c.red`Argument parsing error: ${err.message}`)
  process.exit(1)
})
