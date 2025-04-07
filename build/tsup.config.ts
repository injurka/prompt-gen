import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'], // Точка входа для сборки
  format: ['esm'], // Собираем в ESM формат
  target: 'esnext', // Целевая версия JS
  platform: 'node', // Целевая платформа
  splitting: false, // Не разделять на чанки
  sourcemap: true, // Генерировать source maps
  minify: false, // Не минифицировать
  clean: true, // Очищать папку dist перед сборкой
  dts: true, // Генерировать .d.ts файлы
  shims: true, // Добавить шиммы для __dirname, __filename
  outDir: 'dist', // Выходная директория
  banner: { js: '#!/usr/bin/env node' },
})
