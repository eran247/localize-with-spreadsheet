const fs = require('fs');
const Line = require('./Line');
const EOL = require('./Constants').EOL;

class FileWriter {
  write(filePath, encoding, lines, transformer, options) {
    let fileContent = '';
    if (fs.existsSync(filePath)) {
      fileContent = fs.readFileSync(filePath, encoding);
    }

    const valueToInsert = this.getTransformedLines(lines, transformer);

    const output = transformer.insert(fileContent, valueToInsert, options);

    writeFileAndCreateDirectoriesSync(filePath, output, 'utf8');
  }

  getTransformedLines(lines, transformer) {
    let valueToInsert = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (!line.isEmpty()) {
        if (line.isComment()) {
          const transformed = transformer.transformComment(line.getComment());

          if (transformed !== null) {
            valueToInsert += transformed;

            if (i !== lines.length - 1) {
              valueToInsert += EOL;
            }
          }
        } else {
          valueToInsert += transformer.transformKeyValue(line.getKey(), line.getValue());

          if (i !== lines.length - 1) {
            valueToInsert += EOL;
          }
        }
      }
    }

    return valueToInsert;
  }
}

function writeFileAndCreateDirectoriesSync(filepath, content, encoding) {
  const mkpath = require('mkpath');
  const path = require('path');

  const dirname = path.dirname(filepath);
  mkpath.sync(dirname);

  fs.writeFileSync(filepath, content, encoding);
}

module.exports = FileWriter;
