const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: "Name is required" });
  }
};

const checkBoolean = (req, res, next) => {
  //ALTERNATIVE APPROACH
  //   if (
  //     typeof req.body.is_favorite === boolean ||
  //     req.body.is_favorite === undefined
  //   ) {
  //     next();
  //   }

  if (
    req.body.is_favorite === true ||
    req.body.is_favorite === false ||
    req.body.is_favorite === undefined
  ) {
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};


const validateURL = (req, res, next) => {
  if(req.body.url.substring(0, 7) === "http://" || req.body.url.substring(0, 8) === "https://"){
    return next()
  } else {
    res.status(400).json({ error: "You forgot to start your URL w http:// or https://" })
  }
}

module.exports = { checkName, checkBoolean, validateURL };
