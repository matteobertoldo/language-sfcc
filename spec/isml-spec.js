'use babel';

describe('Language SFCC', () => {
  let grammar = null;

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('language-sfcc'));
    runs(() => (grammar = atom.grammars.grammarForScopeName('text.html.isml')));
  });

  describe('when Atom run language process', () => {
    it('parses the ISML grammar', () => {
      expect(grammar).toBeTruthy();
      return expect(grammar.scopeName).toBe('text.html.isml');
    });
  });
});
