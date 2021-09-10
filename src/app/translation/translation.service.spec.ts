import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    service = new TranslationService();
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('translates keys to german values', () => {
    service.language = 'ger';
    let key = 'example';
    let value = service.translate(key);
    expect(value).toBe('Beispiel');
  });

  it('translates keys to english values', () => {
    service.language = 'eng';
    let key = 'example';
    let value = service.translate(key);
    expect(value).toBe('Example');
  });

  it('switches translation according to language variable', () => {
    let key = 'example';
    service.language = 'ger';
    expect(service.translate(key)).toBe('Beispiel');
    service.language = 'eng';
    expect(service.translate(key)).toBe('Example');
  });

  it('returns placeholder on invalid key', () => {
    let key = '_invalid_';
    expect(service.translate(key)).toBe('!!missing_translation!!');
  });
});
