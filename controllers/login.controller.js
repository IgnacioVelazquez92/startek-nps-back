const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const searchMail = await User.findOne({ email });

    console.log(searchMail);
    if (!searchMail)
      return res.status(401).json({ msg: "Usuario o contraseña incorrecto." });
    if (password !== searchMail.password)
      return res.status(401).json({ msg: "Usuario o contraseña incorrecto." });

    return res.status(200).json({
      msg: "Ingresaste con exito",
      userData: {
        id: searchMail.id,
        name: searchMail.name,
        lastName: searchMail.lastName,
        email: searchMail.email,
        legajoU: searchMail.legajoU,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
};
