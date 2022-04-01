import Sequelize from "sequelize";
const museu = new Sequelize("mariadb://root:root@database:3306/museu");
export default museu;
