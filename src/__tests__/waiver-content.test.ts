import {
  waiverContent,
  getNextLanguage,
  Language,
} from '@/lib/waiver-content';

describe('waiver-content', () => {
  describe('waiverContent', () => {
    it('should have content for all three languages', () => {
      expect(waiverContent).toHaveProperty('en');
      expect(waiverContent).toHaveProperty('es');
      expect(waiverContent).toHaveProperty('zh');
    });

    it('should have all required fields in English content', () => {
      const en = waiverContent.en;
      expect(en.title).toBeDefined();
      expect(en.logoText1).toBe("HOPE'S CORNER");
      expect(en.logoSubtext).toBe("SHARING MEALS, BUILDING COMMUNITY");
      expect(en.points).toHaveLength(3);
      expect(en.subPoints).toHaveLength(4);
      expect(en.submitButton).toBe("Submit Waiver");
    });

    it('should have all required fields in Spanish content', () => {
      const es = waiverContent.es;
      expect(es.title).toBeDefined();
      expect(es.logoText1).toBe("HOPE'S CORNER");
      expect(es.submitButton).toBe("Enviar Renuncia");
    });

    it('should have all required fields in Chinese content', () => {
      const zh = waiverContent.zh;
      expect(zh.title).toBeDefined();
      expect(zh.logoText1).toBe("希望之角");
      expect(zh.submitButton).toBe("提交弃权书");
    });
  });

  describe('getNextLanguage', () => {
    it('should cycle from en to es', () => {
      expect(getNextLanguage('en')).toBe('es');
    });

    it('should cycle from es to zh', () => {
      expect(getNextLanguage('es')).toBe('zh');
    });

    it('should cycle from zh to en', () => {
      expect(getNextLanguage('zh')).toBe('en');
    });

    it('should complete a full cycle', () => {
      let lang: Language = 'en';
      lang = getNextLanguage(lang);
      expect(lang).toBe('es');
      lang = getNextLanguage(lang);
      expect(lang).toBe('zh');
      lang = getNextLanguage(lang);
      expect(lang).toBe('en');
    });
  });
});
