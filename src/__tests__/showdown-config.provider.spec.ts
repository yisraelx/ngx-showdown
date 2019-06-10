import { ShowdownConfig } from '../showdown-config.provider';

describe('ShowdownConfig', () => {

    it('should be set options', () => {
        let config: ShowdownConfig = new ShowdownConfig();
        config.merge({ noHeaderId: false, tables: true });

        expect(config.tables).toBeTruthy();
        expect(config.noHeaderId).toBeFalsy();
    });

});
