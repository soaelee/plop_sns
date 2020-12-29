module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { //DB에는 users 테이블로 생성
    // id가 기본적으로 생성됨
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // UserId: 1
    // PostId: 3
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', //한글 + 이모티콘저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsToMany(db.Hashtag, {through: 'CommentHashtag'});
  };
  return Comment
}
