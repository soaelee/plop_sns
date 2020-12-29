module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { //DB에는 users 테이블로 생성
    // id가 기본적으로 생성됨
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', //한글 + 이모티콘저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
    db.Hashtag.belongsToMany(db.Comment, {through: 'CommentHashtag'});
  };
  return Hashtag
}
