const fs = require('fs');
const path = require('path');

class I18nService {
  constructor() {
    this.defaultLocale = 'en';
    this.translations = {};
    this.loadTranslations();
  }

  loadTranslations() {
    const localesDir = path.join(__dirname, '..', 'locales');
    const files = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'));
    
    files.forEach(file => {
      const locale = path.basename(file, '.json');
      const filePath = path.join(localesDir, file);
      try {
        this.translations[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (error) {
        console.error(`Error loading translation file ${file}:`, error);
      }
    });
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  }

  translate(key, locale = this.defaultLocale, params = {}) {
    const translation = this.getNestedValue(this.translations[locale], key) || 
                       this.getNestedValue(this.translations[this.defaultLocale], key) || 
                       key;

    // Simple template replacement for {{variable}} patterns
    return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }

  getAvailableLocales() {
    return Object.keys(this.translations);
  }

  // Helper method for controllers
  createTranslator(locale) {
    return (key, params = {}) => this.translate(key, locale, params);
  }
}

module.exports = new I18nService();