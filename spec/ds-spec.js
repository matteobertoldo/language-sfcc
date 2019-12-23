'use babel';

describe('Language SFCC', () => {
    let grammar = null;

    beforeEach(() => {
        waitsForPromise(() => atom.packages.activatePackage('language-sfcc'));
        runs(() => (grammar = atom.grammars.grammarForScopeName('source.js.ds')));
    });

    describe('when Atom run language process', () => {
        it('parses the DS grammar', () => {
            expect(grammar).toBeTruthy();
            return expect(grammar.scopeName).toBe('source.js.ds');
        });
    });
});
