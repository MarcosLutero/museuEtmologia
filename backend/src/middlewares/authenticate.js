import jwt from "express-jwt";

const authenticate = () => jwt({ 
    userProperty: 'usuario', 
    secret: (req, payload, done) => {
        done(null, "12345");
    },                
    algorithms: ['HS256']
})
.unless({
    path: [
        /^\/usuario\/login/,
        /^\/respostaAtributoCaracteristica\/?$/,
        /^\/respostaTaxonomia\/?$/
    ]
});

export default authenticate;