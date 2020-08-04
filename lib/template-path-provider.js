'use babel';

import glob from 'glob';

export default class TemplateProvider {
  getRange(editor, range) {
    const searchStart = [range.start.row, 0];
    const searchEnd = [range.end.row + 1, 0];
    const searchRange = [searchStart, searchEnd];

    let attributeRange = null;
    let filePaths = null;

    editor.scanInBufferRange(/template=(?:"([^"]+)"|'([^"]+)')/, searchRange, (found) => {
      filePaths = found.match[1] || found.match[2];
      attributeRange = found.range;
      found.stop();
    });

    return {
      filePaths,
      attributeRange
    };
  }

  getFilePaths(filePath) {
    const finalPath = TemplateProvider._getExtension(filePath) === '.isml' ? filePath : `${filePath}.isml`;
    const opts = {
      nodir: true,
      ignore: ['**/node_modules/**', '**/.git/**']
    };

    return new Promise((resolve, reject) => {
      if (atom.project.getPaths().length > 1) {
        reject(new Error('Multiple repositories on workspace. Make sure you have connected only one project.'));
      }

      glob(`${atom.project.getPaths()[0]}/**/cartridge/templates/**/${finalPath}`, opts, (err, files) => {
        if (err) {
          reject(err);
        } else {
          if (!files.length) {
            resolve(null);
          } else if (files.length === 1) {
            resolve(files[0]);
          } else {
            resolve(files);
          }
        }
      });
    });
  }

  static _getExtension(filePath) {
    const ext = filePath.lastIndexOf('.');
    return ext < 0 ? '' : filePath.substr(ext);
  }

  notifyerr(report) {
    const message = 'Error in opening the path';
    const description = `Attempting to open file path with error: <code>${report.message}</code>.`;
    TemplateProvider._notify(true, message, description, true);
  }

  notifywarn() {
    const message = 'Path not found';
    const description = 'Make sure you entered the correct path in the `template` attribute.';
    TemplateProvider._notify(false, message, description, false);
  }

  static _notify(err, message, description, dismissable) {
    const { notifications } = atom;
    const opts = { description, dismissable };

    return err ? notifications.addError(message, opts) : notifications.addWarning(message, opts);
  }
}
