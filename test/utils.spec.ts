import $ from '../src/utils';

describe('Utils', () => {

    describe('trimEachLine', () => {

        it('should be get text and return text whit out trim', () => {
            expect($.trimEachLine('\t# abc \n ## def\t')).toBe('\t# abc \n ## def\t');
        });

        it('should be get void 0 and return void 0', () => {
            expect($.trimEachLine(void 0)).toBe(void 0);
        });

        it('should be get text and return trim text', () => {
            expect($.trimEachLine('\t# abc \n ## def\t', true)).toBe('# abc\n## def');
        });

        it('should be get text and return trim space text', () => {
            expect($.trimEachLine('\t# abc \n ## def\t', 'space')).toBe('\t# abc\n## def\t');
        });

        it('should be get text and return trim tab text', () => {
            expect($.trimEachLine('\t# abc \n ## def\t', 'tab')).toBe('# abc \n ## def');
        });
    });

});