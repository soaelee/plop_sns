module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { //DB에는 users 테이블로 생성
    // id가 기본적으로 생성됨
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', //한글 + 이모티콘저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'});
    db.Post.belongsTo(db.Post, { as: 'Replop' }); //replop
  };
  return Post
}
