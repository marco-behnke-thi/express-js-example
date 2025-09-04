const i18nService = require('../services/i18n_service');

exports.setLocale = function(req, res, next) {
  // Determine locale from:
  // 1. URL parameter (?lang=de)
  // 2. Session preference
  // 3. Accept-Language header
  // 4. Default to 'en'
  
  let locale = req.query.lang || 
               req.session.locale || 
               req.acceptsLanguages(['en', 'de', 'es']) || 
               'en';

  // Validate locale exists
  if (!i18nService.getAvailableLocales().includes(locale)) {
    locale = 'en';
  }

  // Store in session for persistence
  req.session.locale = locale;
  
  // Make locale and translator available in request
  req.locale = locale;
  req.t = i18nService.createTranslator(locale);
  
  // Make translator available in templates
  res.locals.t = req.t;
  res.locals.locale = locale;
  
  // Make req available in template context for custom filter
  res.locals.req = req;
  
  next();
};