const { GoogleSpreadsheet } = require('google-spreadsheet');
const Q = require('q');

const Line = require('./Line.js');

class GSReader {
  constructor(spreadsheetKey, sheetsFilter) {
    this._sheet = new GoogleSpreadsheet(spreadsheetKey);
    this._sheetsFilter = sheetsFilter;

    this._fetchDeferred = Q.defer();
    this._isFetching = false;
    this._fetchedWorksheets = null;
  }

  static async builder(credentials, spreadsheetKey, sheetsFilter) {
    const reader = new GSReader(spreadsheetKey, sheetsFilter);
    await reader._sheet.useServiceAccountAuth(credentials);

    return reader;
  }

  async fetchAllCells() {
    if (this._fetchedWorksheets !== null) {
      return this._fetchedWorksheets;
    }

    if (this._isFetching) {
      return this._fetchDeferred.promise;
    }

    this._isFetching = true;

    try {
      await this._sheet.loadInfo();
      const sheets = this._sheet.sheetsByIndex;
      const worksheetReader = new WorksheetReader(this._sheetsFilter, sheets);

      try {
        this._fetchedWorksheets = await worksheetReader.next();
        this._fetchDeferred.resolve(this._fetchedWorksheets);
        return this._fetchedWorksheets;
      } catch (error) {
        console.error('worksheetReader stopped because of:', error);
        this._fetchDeferred.reject(error);
      }
    } catch (err) {
      console.error('Error while fetching the Spreadsheet:', err);
      console.warn('WARNING! Check that your spreadsheet is "Published" in "File > Publish to the web..."');
      this._fetchDeferred.reject(err);
    }
  }

  async select(keyCol, valCol, defaultLanguage) {
    try {
      const cells = await this.fetchAllCells();
      return this.extractFromRawData(cells, keyCol, valCol, defaultLanguage);
    } catch (error) {
      console.error('Fetching stopped because of:', error);
      return undefined;
    }
  }

  extractFromRawData(rawWorksheets, keyCol, valCol, defaultLanguage) {
    const extractedLines = [];
    for (let i = 0; i < rawWorksheets.length; i++) {
      const extracted = this.extractFromWorksheet(rawWorksheets[i], keyCol, valCol, defaultLanguage);
      extractedLines.push(...extracted);
    }

    return extractedLines;
  }

  extractFromWorksheet(rawWorksheet, keyCol, valCol, defaultLanguage) {
    const results = [];
    const rows = rawWorksheet;

    const headers = rows[0];

    if (headers) {
      let keyIndex = -1;
      let valIndex = -1;
      let defaultLanguageIndex = -1;

      for (let i = 0; i < headers.length; i++) {
        const value = headers[i].value;

        if (value === keyCol) {
          keyIndex = i;
        }
        if (value === valCol) {
          valIndex = i;
        }
        if (defaultLanguage && value === defaultLanguage) {
          defaultLanguageIndex = i;
        }
      }
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];

        if (row) {
          try {
            const keyValue = row[keyIndex].value;
            const valValue = row[valIndex].value || row[defaultLanguageIndex].value;

            if (keyValue) {
              results.push(new Line(keyValue, valValue));
            }

          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    return results;
  }

  static isAllSheets(sheet) {
    return !sheet || sheet === '*';
  }

  static shouldUseWorksheet(selectedSheets, title, index) {
    if (GSReader.isAllSheets(selectedSheets)) {
      return true;
    } else {
      const selectedArray = GSReader.forceArray(selectedSheets);
      for (let i = 0; i < selectedArray.length; i++) {
        const a = selectedArray[i];

        if (typeof (a) === "number" && index === a) {
          return true;
        } else if (typeof (a) === "string" && title === a) {
          return true;
        }
      }
      return false;
    }
  }

  static forceArray(val) {
    if (Array.isArray(val)) return val;
    if (!val) return [];
    return [val];
  }
}

class WorksheetReader {
  constructor(filterSheets, worksheets) {
    this._filterSheets = filterSheets;
    this._worksheets = worksheets;
    this._index = 0;
    this._data = [];
  }

  async next() {
    if (this._index < this._worksheets.length) {
      const index = this._index++;
      const currentWorksheet = this._worksheets[index];

      if (GSReader.shouldUseWorksheet(this._filterSheets, currentWorksheet.title, index)) {
        try {
          await currentWorksheet.loadCells();
          this._data.push(currentWorksheet._cells);
        } catch (err) {
          console.error(err);
        }

        return this.next();
      } else {
        return this.next();
      }
    } else {
      return this._data;
    }
  }
}

class FakeReader {
  constructor(array) {
    this._array = array;
    this._index = 0;
  }

  select(sheets, keyCol, keyVal, cb) {
    const target = [];

    this._array.forEach((key) => {
      const v = this._array[key];
      target.push(new Line(v[keyCol], v[keyVal]));
    });

    cb(target);
  }
}

module.exports = {
  GS: GSReader,
  Fake: FakeReader
};
