exports.getIndex = function(req, res, next) {
  const title = req.t('pages.home_title');
  res.render('index', { 
    title: title,
    welcomeMessage: req.t('pages.home_welcome', { title: title })
  });
};