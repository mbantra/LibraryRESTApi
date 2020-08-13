
function utils() {
    const checkRoles = (...roles) => (req, res, next) => {

        console.log(req.user);
        const hasRole = roles.find(role => req.user.roles.includes(role));
        if(!hasRole) {
            return res.send('Necessary Role is not found');
        }
        return next();
    }
    return { checkRoles };
}


module.exports = utils();