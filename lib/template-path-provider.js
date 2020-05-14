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

    openFilePaths(filePath) {
        this._getFilePaths(filePath)
            .then((result) => {
                return !result ? this._notifywarn() : atom.workspace.open(result);
            })
            .catch((err) => {
                this._notifyerr(err);
            });
    }

    _getFilePaths(filePath) {
        const finalPath = this._getExtension(filePath) === '.isml' ? filePath : `${filePath}.isml`;
        const opts = {
            nodir: true,
            ignore: ['**/node_modules/**']
        };

        return new Promise((resolve, reject) => {
            if (atom.project.getPaths().length > 1) {
                reject(new Error('Multiple repositories on workspace. Make sure you have connected only one project.'));
            }

            glob(`${atom.project.getPaths()[0]}/**/cartridge/templates/**/${finalPath}`, opts, (err, files) => {
                return err ? reject(err) : resolve(files[0]);
            });
        });
    }

    _getExtension(filePath) {
        const ext = filePath.lastIndexOf('.');
        return ext < 0 ? '' : filePath.substr(ext);
    }

    _notifyerr(report) {
        const message = 'Error in opening the path';
        const description = `Attempting to open file path with error: <code>${report.message}</code>.`;
        this._notify(true, message, description, true);
    }

    _notifywarn() {
        const message = 'Path not found';
        const description = 'Make sure you entered the correct path in the `template` attribute.';
        this._notify(false, message, description, false);
    }

    _notify(err, message, description, dismissable) {
        const { notifications } = atom;
        const opts = { description, dismissable };

        return err ? notifications.addError(message, opts) : notifications.addWarning(message, opts);
    }
}
