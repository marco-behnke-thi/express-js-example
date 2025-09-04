exports.param = function(paramName) {
  return {
    isInt: function(req, res, next) {
      const paramValue = req.params[paramName];
      
      if (!paramValue) {
        return res.status(400).json({ 
          error: `Parameter '${paramName}' is required` 
        });
      }
      
      const intValue = parseInt(paramValue, 10);
      
      if (isNaN(intValue) || intValue.toString() !== paramValue) {
        return res.status(400).json({ 
          error: `Parameter '${paramName}' must be a valid integer` 
        });
      }
      
      req.params[paramName] = intValue;
      next();
    },
    
    isUUID: function(req, res, next) {
      const paramValue = req.params[paramName];
      
      if (!paramValue) {
        return res.status(400).json({ 
          error: `Parameter '${paramName}' is required` 
        });
      }
      
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      if (!uuidRegex.test(paramValue)) {
        return res.status(400).json({ 
          error: `Parameter '${paramName}' must be a valid UUID` 
        });
      }
      
      next();
    }
  };
};