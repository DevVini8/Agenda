const Login = require('../models/LoginModel')


exports.index = (req, res) => {
  if(req.session.user){
    return res.render('login-logado')}
  console.log(req.session.user)
  res.render('login')

};
exports.register = async function (req, res) {
  try {
    const login = new Login(req.body)
    await login.Registrar()

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('../login');

      })
      return;
    }

    req.flash('success', 'Usuario criado com sucesso');
    req.session.save(function () {
      return res.redirect('../login');
    })

  } catch (e) {
    res.render('404')
    console.log(e)

  }

};
exports.login = async function (req, res) {
  try {
    const login = new Login(req.body)
    await login.login()

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('../login');

      })
      return;
    }

    req.flash('success', 'Voce entrou no sistema');
    req.session.user=login.user;
    req.session.save(function () {
      return res.redirect('../login');
    })

  } catch (e) {
    res.render('404')
    console.log(e)

  }
}
exports.logout=(req,res)=>{
  req.session.destroy()
  res.redirect('/')

}
