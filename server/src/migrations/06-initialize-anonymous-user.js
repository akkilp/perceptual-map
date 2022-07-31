module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query(
      "INSERT INTO users (id,username,email,password_hash,admin) VALUES (-1,'anonymous','doesnt@exist.com','asdasd',FALSE);"
    );
  },
  down: async ({ context: queryInterface }) => {},
};
