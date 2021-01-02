module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { //DB에는 users 테이블로 생성
    // id가 기본적으로 생성됨
    src: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', //한글 + 이모티콘저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image
}
