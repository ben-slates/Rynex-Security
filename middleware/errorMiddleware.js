const notFoundHandler = (req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found | Rynex Security',
    description: 'The requested Rynex Security page could not be found.',
    canonicalPath: req.originalUrl,
    cssFile: '/css/home.css',
    active: '',
    externalScripts: '',
    localScript: '',
    contactScript: '',
    structuredData: null
  });
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = status >= 500 ? 'Something went wrong while processing your request.' : err.message;

  if (req.accepts('json') && req.path.startsWith('/api/')) {
    return res.status(status).json({ success: false, message });
  }

  return res.status(status).render('pages/500', {
    title: 'Server Error | Rynex Security',
    description: 'Rynex Security encountered an error while processing the request.',
    canonicalPath: req.originalUrl,
    cssFile: '/css/home.css',
    active: '',
    externalScripts: '',
    localScript: '',
    contactScript: '',
    structuredData: null
  });
};

module.exports = { notFoundHandler, errorHandler };
