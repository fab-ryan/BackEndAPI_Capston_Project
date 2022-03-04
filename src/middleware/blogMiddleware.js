const blogValidate = (req, res, next) => {
  let { ArticleTitle, ArticlePreview, ArticleImage, ArticleDescription } =
    req.body;
  if (ArticleTitle == "") {
    res.json({
      error: "error Article Title required",
    });
    return false;
  }
  if (ArticlePreview == "") {
    res.json({
      error: "error Articel Preview required",
    });
    return false;
  }
  if (ArticleImage == "") {
    res.json({
      error: "error Article Image required",
    });
    return false;
  }
  if (ArticleDescription == "") {
    res.json({
      error: "error Article Description",
    });
    return false;
  }
};
