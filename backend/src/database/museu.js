import Sequelize from "sequelize";
const museu = new Sequelize("mariadb://root:12345@database:3306/museu");
export default museu;
