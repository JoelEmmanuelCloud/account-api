
const login = async (req, res) => {
    res.send('login users');
}
const logout = async (req, res) => {
    res.send('logout users');
}


modules.exports = {login, logout};
