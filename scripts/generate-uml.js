#!/usr/bin/env node
// node scripts / generate - uml.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const docsDir = path.join(rootDir, 'docs');
const outFile = path.join(docsDir, 'uml-diagrama.md');

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            files.push(fullPath);
        }
    }

    return files;
}

function parseEntity(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const classMatch = content.match(/export class\s+(\w+)/);
    if (!classMatch) return null;

    const className = classMatch[1];
    const relations = [];
    const relationRegex = /@ManyToOne\(\(\) => (\w+)[\s\S]*?\n\s+(\w+)\s*:\s*\w+;/g;

    let match;
    while ((match = relationRegex.exec(content)) !== null) {
        const [, relatedClass, fieldName] = match;
        if (relatedClass && relatedClass !== className) {
            relations.push({ relatedClass, fieldName });
        }
    }

    return { className, filePath, relations };
}

function buildMermaidDiagram(entities) {
    const lines = [];
    lines.push('# Diagrama UML del backend');
    lines.push('');
    lines.push('> Generado automáticamente inspeccionando las entidades TypeORM del proyecto.');
    lines.push('');
    lines.push('```mermaid');
    lines.push('classDiagram');
    lines.push('');

    for (const entity of entities) {
        lines.push(`class ${entity.className} {}`);
    }

    lines.push('');

    for (const entity of entities) {
        for (const relation of entity.relations) {
            const targetEntity = entities.find((item) => item.className === relation.relatedClass);
            if (targetEntity) {
                lines.push(`${relation.relatedClass} "1" --> "*" ${entity.className} : ${relation.fieldName}`);
            }
        }
    }

    lines.push('```');
    lines.push('');
    lines.push('## Entidades detectadas');
    lines.push('');

    for (const entity of entities) {
        lines.push(`- ${entity.className}: ${path.relative(rootDir, entity.filePath).replace(/\\/g, '/')}`);
    }

    return lines.join('\n');
}

const entityFiles = walk(srcDir)
    .filter((filePath) => /\/entities\/.*\.entity\.ts$/.test(filePath))
    .sort();

const entities = entityFiles
    .map(parseEntity)
    .filter(Boolean)
    .sort((a, b) => a.className.localeCompare(b.className));

if (entities.length === 0) {
    console.error('No se encontraron entidades TypeORM para diagramar.');
    process.exit(1);
}

fs.mkdirSync(docsDir, { recursive: true });
fs.writeFileSync(outFile, buildMermaidDiagram(entities), 'utf8');
console.log(`Diagrama generado en ${path.relative(rootDir, outFile).replace(/\\/g, '/')}`);
