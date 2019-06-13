import { ShowdownConfig } from '../showdown-config.provider';

describe('ShowdownConfig', () => {

  it('should be set options', () => {
    let config: ShowdownConfig = new ShowdownConfig();
    config.merge({noHeaderId: false, tables: true});

    expect(config.tables).toBeTruthy();
    expect(config.noHeaderId).toBeFalsy();
  });

  it('should be set only own options', () => {
    let options: ShowdownConfig = Object.setPrototypeOf({foo: 'bar'}, {color: 'red'});
    let config: ShowdownConfig = new ShowdownConfig(options);

    expect(config.options).toBeUndefined();
    expect(config.foo).toBe('bar');
  });

});
