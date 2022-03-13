const blogValidate = (req, res, next) => {
  let { ArticleTitle, ArticlePreview, ArticleImage, ArticleDescription } =
    req.body;
  console.log(req.body, "kkkkkkkkkkk");
  if (ArticleTitle == "" || !ArticleTitle) {
    return res.status(409).json({
      error: "error Article Title required",
    });
  }
  if (ArticlePreview == "" || !ArticlePreview) {
    return res.status(409).json({
      error: "error Articel Preview required",
    });
  }
  if (ArticleImage == "" || !ArticleImage) {
    return res.status(409).json({
      error: "error Article Image required",
    });
  }
  if (ArticleDescription == "" || !ArticleDescription) {
    return res.status(409).json({
      error: "error Article Description",
    });
  }
  next();
};
export { blogValidate };
