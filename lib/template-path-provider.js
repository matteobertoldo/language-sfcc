'use babel';

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

    getFilePaths(currentPath, targetPath) {
        alert(currentPath, targetPath);
    }
}
