const COMMENT_STARTERS = ['//', '#'];

class Line {
  constructor(key, value) {
    this._isComment = false;
    this._key = key ? key.toString() : '';
    this._value = value || '';

    if (this._key) {
      this._isComment = Line.checkIsComment(this._key);
      if (this._isComment) {
        this._key = Line.normalizeComment(this._key);
      }
    }
  }

  static checkIsComment(val) {
    for (let i = 0; i < COMMENT_STARTERS.length; i++) {
      const commentStarter = COMMENT_STARTERS[i];
      if (val.indexOf(commentStarter) === 0) {
        return true;
      }
    }
    return false;
  }

  static normalizeComment(val) {
    for (let i = 0; i < COMMENT_STARTERS.length; i++) {
      const commentStarter = COMMENT_STARTERS[i];
      const index = val.indexOf(commentStarter);
      if (index === 0) {
        let normalized = val.substr(commentStarter.length, val.length - commentStarter.length);
        normalized = normalized.trim();
        return normalized;
      }
    }
    return val;
  }

  isEmpty() {
    return !this._isComment && !this._key;
  }

  isComment() {
    return this._isComment;
  }

  getComment() {
    return this._key;
  }

  getKey() {
    return this._key;
  }

  getValue() {
    return this._value;
  }
}

module.exports = Line;
