Конечно, вот обновленная версия вашего файла `README.md`, которая включает информацию о новой возможности использования файла конфигурации `prompt-gen.config.json`.

***

## Генератор Промптов для AI из Проекта (@injurkx/prompt-gen)

Консольная утилита для сканирования директории вашего проекта, сбора текстовых и кодовых файлов (с учетом правил `.gitignore`) и объединения их в один текстовый файл. Этот файл подходит для использования в качестве контекстного промпта для больших языковых моделей (LLM).

## Как использовать

Утилиту можно запускать несколькими спосоями: через `npx`, после глобальной установки, или используя файл конфигурации для удобства.

### 1. Использование с файлом конфигурации (Рекомендуемый способ)

Чтобы не вводить длинные команды, вы можете создать файл `prompt-gen.config.json` в корневой директории вашего проекта. Утилита автоматически найдет и применит настройки из него.

**Пример `prompt-gen.config.json`:**

```json
{
  "extensions": "ts,vue,json,scss,md,rs,toml",
  "directory": "./",
  "output": "src_prompt.md",
  "format": "structured",
  "excludePaths": "**/configs/**,**/build/**,**/public/**,**/test/**,**/*.spec.ts,**/vendor/**,bun.lock,**/.vscode/**,**/gen/**,**/target/**",
  "maxSize": "100"
}
```

После создания файла, для генерации промпта достаточно выполнить простую команду:

```bash
# Утилита сама найдет и использует prompt-gen.config.json
prompt-gen
```

**Приоритет настроек:**

Настройки применяются в следующем порядке (от высшего к низшему):
1.  **Аргументы командной строки** (например, `prompt-gen -m 200` переопределит `maxSize`).
2.  **Настройки из файла `prompt-gen.config.json`**.
3.  **Значения по умолчанию**.

### 2. Использование через NPX или глобальную установку

- **Через NPX (без установки):**

  ```bash
  npx @injurkx/prompt-gen [опции]
  ```

  Пример:
  ```bash
  npx @injurkx/prompt-gen --directory ./src --output src_prompt.md
  ```

- **Глобальная установка:**

  ```bash
  npm install -g @injurkx/prompt-gen
  ```

- **Примеры использования после установки:**

  ```bash
  # Собрать промпт из текущей директории в prompt.txt (настройки по умолчанию)
  prompt-gen

  # Указать директорию и выходной файл
  prompt-gen --directory ./src --output src_prompt.md

  # Указать только нужные расширения и максимальный размер файла (100KB)
  prompt-gen -e ts,tsx,css -m 100

  # Игнорировать .gitignore и использовать структурированный формат
  prompt-gen --no-gitignore --format structured

  # Исключить папки тестов и файлы .spec, добавить префикс
  prompt-gen --exclude-paths "**/test*,**/*.spec.ts,**/node_modules/**" --prefix "Вот контекст проекта:"

  # Показать справку
  prompt-gen --help
  ```

### 3. Локальный запуск из исходников (для разработки)

- **Установка зависимостей:** `npm install`
- **Компиляция:** `npm run build`
- **Запуск скомпилированного кода:**
  ```bash
  node dist/index.js --directory ../another-project -o ../another-project/prompt.txt
  ```
- **Запуск в режиме разработки (через `ts-node`):**
  ```bash
  npm run dev -- --directory ./src -o dev_prompt.txt
  ```

## Опции

Все опции можно указывать как в командной строке, так и в файле `prompt-gen.config.json` (используя имя опции без `--` в качестве ключа JSON).

| Опция | Алиас | Описание | По умолчанию |
| :--- | :--- | :--- | :--- |
| `--directory <dir>` | `-d` | Директория проекта для сканирования. | `.` (текущая директория) |
| `--output <file>` | `-o` | Путь к выходному файлу. | `prompt.txt` |
| `--extensions <extensions>` | `-e` | Список расширений файлов для включения (через запятую). | `ts,tsx,js,jsx,md,json,yaml,yml,txt,sh,py,go,rb,php,html,css,scss,less` |
| `--max-size <size>` | `-m` | Максимальный размер файла (в КБ) для включения. | `500` |
| `--include-paths <patterns>` | | Glob-паттерны для принудительного включения (через запятую). | (нет) |
| `--exclude-paths <patterns>` | | Glob-паттерны для явного исключения (через запятую). | (нет) - Примечание: `node_modules`, `dist`, `.git` и т.д. исключаются по умолчанию. |
| `--no-gitignore` | | Игнорировать файл `.gitignore`, даже если он существует. | `false` (т.е. использовать `.gitignore`) |
| `--format <format>` | | Формат вывода: `flat` или `structured`. | `flat` |
| `--prefix <text>` | | Текст для добавления в самое начало промпта. | (нет) |
| `--suffix <text>` | | Текст для добавления в самый конец промпта. | (нет) |
| `--version` | `-V` | Показать номер версии. | |
| `--help` | `-h` | Показать справочную информацию. | |

## Пример вывода (`--format structured`)

```text
== Project Prompt ==
Generated: 2025-08-14T22:00:00.000Z
Source Directory: /path/to/your/project
Included Files: 3
Total Size: 25.40 KB
Format: structured
====================

=== Project File Structure ===
├── src
│   ├── index.ts
│   └── utils.ts
└── package.json
============================

=== File List ===
- src/index.ts (15.20 KB)
- src/utils.ts (8.15 KB)
- package.json (2.05 KB)
=================

=== File Contents ===

--- File: src/index.ts ---

// Содержимое файла index.ts

--- File: src/utils.ts ---

// Содержимое файла utils.ts

--- File: package.json ---

{
  "name": "my-project",
  // Содержимое файла package.json
}

=====================
```
