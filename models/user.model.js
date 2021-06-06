module.exports = (sequelize, Sequelize) => {
    const UserDetails = sequelize.define("UserDetails", {
       
                  first_name: {
                    type: Sequelize.STRING
                  },
                  last_name: {
                    type: Sequelize.STRING
                  },
                  email: {
                    type: Sequelize.STRING
                  },
                  age: {
                    type: Sequelize.INTEGER
                  },
    });
  
    return UserDetails;
  };
