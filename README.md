## Генератор Промптов для AI из Проекта (@injurka/prompt-gen)

Консольная утилита для сканирования директории вашего проекта, сбора текстовых и кодовых файлов (с учетом правил `.gitignore`) и объединения их в один текстовый файл. Этот файл подходит для использования в качестве контекстного промпта для больших языковых моделей (LLM).

## Как использовать

После установки или сборки проекта, вы можете использовать CLI.

### Глобальная установка или через NPX (Рекомендуется для частого использования):\*\*

- **Установка:**

  - _Если пакет опубликован на npm:_
    ```bash
    npm install -g @injurka/prompt-gen
    ```
  - Если вы находитесь в корневой папке _вашего локального_ проекта (`prompt-generator`) и хотите установить его глобально из локальных исходников:
    ```bash
    npm install -g .
    ```

- **Использование через NPX (без глобальной установки):**

  ```bash
  npx @injurka/prompt-gen [опции]
  ```

  Пример:

  ```bash
  npx @injurka/prompt-gen --directory ./src --output src_prompt.md
  ```

- **Использование после глобальной установки (если `bin` настроен на `prompt-gen`):**

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

### Локальный запуск из исходников (Для разработки или разового использования):\*\*

- **Предварительно:**
  - Убедитесь, что зависимости установлены: `npm install`
  - Скомпилируйте проект (если еще не сделали): `npm run build`
- **Запуск скомпилированного кода:**
  Используйте `node` для запуска `dist/index.js`:
  ```bash
  node dist/index.js --directory ../another-project -o ../another-project/prompt.txt
  ```
- **Запуск в режиме разработки (через `ts-node`):**
  Используйте скрипт `dev` из `package.json`. Обратите внимание на `--` перед передачей аргументов самому скрипту:
  ```bash
  npm run dev -- --directory ./src -o dev_prompt.txt --no-gitignore
  ```

## Опции командной строки

| Опция                        | Алиас | Описание                                                     | По умолчанию                                                                                          |
| :--------------------------- | :---- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `--directory <dir>`          | `-d`  | Директория проекта для сканирования.                         | `.` (текущая директория)                                                                              |
| `--output <file>`            | `-o`  | Путь к выходному файлу для сгенерированного промпта.         | `prompt.txt`                                                                                          |
| `--extensions <extensions>`  | `-e`  | Список расширений файлов для включения (через запятую).      | `ts,tsx,js,jsx,md,json,yaml,yml,txt,sh,py`                                                            |
| `--max-size <size>`          | `-m`  | Максимальный размер файла (в КБ) для включения.              | `500`                                                                                                 |
| `--include-paths <patterns>` |       | Glob-паттерны для принудительного включения (через запятую). | (нет)                                                                                                 |
| `--exclude-paths <patterns>` |       | Glob-паттерны для явного исключения (через запятую).         | (нет) - Примечание: `node_modules`, `dist`, `.git` и т.д. исключаются по умолчанию через glob ignore. |
| `--no-gitignore`             |       | Игнорировать файл `.gitignore`, даже если он существует.     | `false` (т.е. использовать `.gitignore` по умолчанию)                                                 |
| `--format <format>`          |       | Формат вывода: `flat` или `structured`.                      | `flat`                                                                                                |
| `--prefix <text>`            |       | Текст для добавления в самое начало промпта.                 | (нет)                                                                                                 |
| `--suffix <text>`            |       | Текст для добавления в самый конец промпта.                  | (нет)                                                                                                 |
| `--version`                  | `-V`  | Показать номер версии.                                       |                                                                                                       |
| `--help`                     | `-h`  | Показать справочную информацию.                              |                                                                                                       |

## Пример вывода (`prompt.txt` с опцией `--format flat`)

```text
== Project Prompt ==
Generated: 2023-10-27T10:30:00.123Z
Source Directory: /path/to/your/project
Included Files: 15
Total Size: 85.67 KB
Format: flat
====================

--- File: src/index.ts ---

#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
// ... остальное содержимое index.ts ...

--- File: src/utils/helpers.ts ---

export function utilityFunction() {
  // ... содержимое helpers.ts ...
}

--- File: README.md ---

# Название Проекта
// ... содержимое README.md ...

--- File: package.json ---

{
  "name": "my-project",
  // ... содержимое package.json ...
}

```
