exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
}