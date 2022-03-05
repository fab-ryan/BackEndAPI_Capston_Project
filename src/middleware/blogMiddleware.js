const blogValidate = (req, res, next) => {
  let { ArticleTitle, ArticlePreview, ArticleImage, ArticleDescription } =
    req.body;
  if (ArticleTitle == "") {
    res.json({
      error: "error Article Title required",
    });
  }
  if (ArticlePreview == "") {
    res.json({
      error: "error Articel Preview required",
    });
  }
  if (ArticleImage == "") {
    res.json({
      error: "error Article Image required",
    });
  }
  if (ArticleDescription == "") {
    res.json({
      error: "error Article Description",
    });
  }
  next();
};
export { blogValidate };
