import jwt from "express-jwt";

const authenticate = () => jwt({ 
    userProperty: 'usuario', 
    secret: (req, payload, done) => {
        if (req.config.JWT_PASSWORD){
            done(null, req.config.JWT_PASSWORD);
        } else {
            done(new Error("JWT_PASSWORD not configured."));
        }
    },                
    algorithms: ['HS256']
})
.unless({
    path: [
        /^\/usuario\/login/,

    ]
});

export default authenticate;