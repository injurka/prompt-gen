export interface FileInfo {
  path: string // Относительный путь от корня проекта
  content: string
  size: number // Размер в КБ
}

export interface CliOptions {
  output: string
  directory: string
  extensions: string
  maxSize: string
  includePaths?: string
  excludePaths?: string
  gitignore: boolean // commander преобразует --no-gitignore в false
  format: 'flat' | 'structured'
  prefix?: string
  suffix?: string
}
