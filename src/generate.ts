import type { CliOptions, FileInfo } from './types.js'
import fs from 'node:fs'
import path from 'node:path'
import c from 'ansis'
import { glob } from 'glob'
import ignore from 'ignore'

// --- Tree Generation Utilities ---

interface TreeNode { [key: string]: TreeNode | true }

function buildTreeLinesRecursive(node: TreeNode, prefix = ''): string[] {
  let lines: string[] = []
  const entries = Object.entries(node).sort(([keyA, valueA], [keyB, valueB]) => {
    const typeA = typeof valueA === 'object' ? 0 : 1
    const typeB = typeof valueB === 'object' ? 0 : 1
    if (typeA !== typeB)
      return typeA - typeB
    return keyA.localeCompare(keyB)
  })

  const numEntries = entries.length

  entries.forEach(([key, value], index) => {
    const isLast = index === numEntries - 1
    const connector = isLast ? '└── ' : '├── '
    lines.push(prefix + connector + key)

    if (typeof value === 'object') {
      const newPrefix = prefix + (isLast ? '    ' : '│   ')
      lines = lines.concat(buildTreeLinesRecursive(value, newPrefix))
    }
  })
  return lines
}

function generateFileTree(files: FileInfo[]): string {
  if (files.length === 0) {
    return ''
  }

  const root: TreeNode = {}

  for (const file of files) {
    const parts = file.path.split('/').filter(part => part.length > 0)
    let currentNode = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!
      const isLastPart = i === parts.length - 1

      if (isLastPart) {
        if (!(part in currentNode)) {
          currentNode[part] = true
        }
      }
      else {
        if (!(part in currentNode) || typeof currentNode[part] !== 'object') {
          currentNode[part] = {}
        }
        if (typeof currentNode[part] === 'object') {
          currentNode = currentNode[part] as TreeNode
        }
        else {
          console.warn(c.yellow(`Path conflict detected for "${part}" in "${file.path}". Skipping subtree generation for this part.`))
          break
        }
      }
    }
  }

  const treeLines = buildTreeLinesRecursive(root)

  let treeString = '=== Project File Structure ===\n'
  treeString += treeLines.join('\n')
  treeString += '\n============================\n\n'

  return treeString
}

// --- Main Prompt Generation Function ---

export async function generatePrompt(options: CliOptions): Promise<void> {
  try {
    const projectDir = path.resolve(options.directory)
    const outputFilePath = path.resolve(options.output)
    const includedExtensions = options.extensions.split(',').map(ext => ext.trim().toLowerCase())
    const maxSizeKB = Number.parseInt(options.maxSize, 10)
    const outputFormat = options.format === 'structured' ? 'structured' : 'flat'

    if (Number.isNaN(maxSizeKB) || maxSizeKB <= 0) {
      console.error(c.red(`Invalid max file size: ${options.maxSize}. Must be a positive number.`))
      process.exit(1)
    }

    console.log(c.blue(`Scanning directory: ${projectDir}`))
    console.log(c.blue(`Including extensions: ${includedExtensions.join(', ')}`))
    console.log(c.blue(`Maximum file size: ${maxSizeKB} KB`))
    console.log(c.blue(`Output format: ${outputFormat}`))

    const ig = ignore()
    const gitignorePath = path.join(projectDir, '.gitignore')

    if (options.gitignore && fs.existsSync(gitignorePath)) {
      try {
        console.log(c.blue(`Using .gitignore from ${gitignorePath}`))
        const gitignoreContent = await fs.promises.readFile(gitignorePath, 'utf8')
        ig.add(gitignoreContent)
      }
      catch (error: any) {
        console.error(c.yellow(`Warning: Could not read .gitignore file at ${gitignorePath}. Skipping. Error: ${error.message}`))
      }
    }
    else {
      if (options.gitignore) {
        console.log(c.yellow('No .gitignore file found in the target directory.'))
      }
      else {
        console.log(c.yellow('Ignoring .gitignore file as requested by --no-gitignore.'))
      }
    }

    let globPatterns = includedExtensions.map(ext => `**/*.${ext}`)
    if (options.includePaths) {
      const includePatterns = options.includePaths.split(',').map(p => p.trim()).filter(p => p)
      if (includePatterns.length > 0) {
        console.log(c.blue(`Including custom patterns: ${includePatterns.join(', ')}`))
        globPatterns = [...globPatterns, ...includePatterns]
      }
    }

    const outputFileName = path.basename(outputFilePath)
    const defaultIgnorePatterns = ['node_modules/**', 'dist/**', 'build/**', '.git/**', outputFileName]
    let globIgnorePatterns = [...defaultIgnorePatterns]

    if (options.excludePaths) {
      const excludePatterns = options.excludePaths.split(',').map(p => p.trim()).filter(p => p)
      if (excludePatterns.length > 0) {
        console.log(c.blue(`Excluding custom patterns: ${excludePatterns.join(', ')}`))
        globIgnorePatterns = [...globIgnorePatterns, ...excludePatterns]
      }
    }

    console.log(c.cyan('Searching for files...'))
    const allFoundFiles = await glob(globPatterns, {
      cwd: projectDir,
      nodir: true,
      dot: true,
      ignore: globIgnorePatterns,
      absolute: false,
    })

    console.log(c.green(`Glob found ${allFoundFiles.length} potential files.`))

    const fileInfos: FileInfo[] = []
    let totalSizeKB = 0
    let skippedCount = 0

    console.log(c.cyan('Filtering and reading files...'))

    const results = await Promise.all(allFoundFiles.map(async (relativeFilePath): Promise<FileInfo | null> => {
      if (options.gitignore && ig.ignores(relativeFilePath)) {
        skippedCount++
        return null
      }

      const absoluteFilePath = path.join(projectDir, relativeFilePath)

      try {
        const stats = await fs.promises.stat(absoluteFilePath)
        const fileSizeKB = stats.size / 1024

        if (fileSizeKB > maxSizeKB) {
          console.log(c.yellow(`Skipping ${relativeFilePath} (size: ${fileSizeKB.toFixed(2)} KB > max: ${maxSizeKB} KB)`))
          skippedCount++
          return null
        }
        if (fileSizeKB === 0) {
          console.log(c.yellow(`Skipping ${relativeFilePath} (empty file)`))
          skippedCount++
          return null
        }

        const content = await fs.promises.readFile(absoluteFilePath, 'utf8')

        if (content.includes('\uFFFD')) {
          console.log(c.yellow(`Skipping ${relativeFilePath} (appears to be binary)`))
          skippedCount++
          return null
        }

        return {
          path: relativeFilePath.replace(/\\/g, '/'),
          content,
          size: fileSizeKB,
        }
      }
      catch (error: any) {
        console.error(c.red(`Error processing file ${relativeFilePath}: ${error.message}`))
        skippedCount++
        return null
      }
    }))

    results.forEach((result) => {
      if (result) {
        fileInfos.push(result)
        totalSizeKB += result.size
      }
    })

    fileInfos.sort((a, b) => a.path.localeCompare(b.path))

    console.log(c.green(`Successfully processed ${fileInfos.length} files.`))
    if (skippedCount > 0) {
      console.log(c.yellow(`Skipped ${skippedCount} files (due to gitignore, size limit, errors, or binary content).`))
    }
    if (fileInfos.length === 0) {
      console.log(c.yellow('No files were included in the prompt. Exiting.'))
      process.exit(0)
    }

    console.log(c.cyan('Generating prompt content...'))
    let promptContent = ''

    if (options.prefix) {
      promptContent += `${options.prefix}\n\n`
    }

    promptContent += `== Project Prompt ==\n`
    promptContent += `Generated: ${new Date().toISOString()}\n`
    promptContent += `Source Directory: ${projectDir}\n`
    promptContent += `Included Files: ${fileInfos.length}\n`
    promptContent += `Total Size: ${totalSizeKB.toFixed(2)} KB\n`
    promptContent += `Format: ${outputFormat}\n`
    promptContent += `====================\n\n`

    const fileTreeString = generateFileTree(fileInfos)
    if (fileTreeString) {
      promptContent += fileTreeString
    }

    if (outputFormat === 'structured') {
      promptContent += `=== File List ===\n`
      fileInfos.forEach((file) => {
        promptContent += `- ${file.path} (${file.size.toFixed(2)} KB)\n`
      })
      promptContent += `=================\n\n`

      promptContent += `=== File Contents ===\n`
      fileInfos.forEach((file) => {
        promptContent += `\n--- File: ${file.path} ---\n`
        promptContent += `\n${file.content.trim()}\n`
      })
      promptContent += `\n=====================\n`
    }
    else {
      fileInfos.forEach((file) => {
        promptContent += `\n--- File: ${file.path} ---\n`
        promptContent += `\n${file.content.trim()}\n`
      })
    }

    if (options.suffix) {
      promptContent += `\n\n${options.suffix}\n`
    }

    try {
      await fs.promises.writeFile(outputFilePath, promptContent)
      console.log(c.green(`Successfully generated prompt at: ${outputFilePath}`))
      const outputStats = await fs.promises.stat(outputFilePath)
      console.log(c.green(`Final prompt file size: ${(outputStats.size / 1024).toFixed(2)} KB`))
    }
    catch (error: any) {
      console.error(c.red(`Error writing output file ${outputFilePath}: ${error.message}`))
      process.exit(1)
    }
  }
  catch (error: any) {
    console.error(c.red('An unexpected error occurred during prompt generation:'), error)
    process.exit(1)
  }
}
