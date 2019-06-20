const mongoose = require('mongoose');
const schemaOptions = require('./schemaOptions');

// Schema는 모델의 스키마
// 데이터 테이블의 칼럼 및 필드 정의
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  insertedDate: { type: Date, default: Date.now },
}, schemaOptions);

// 정의한 Schema로 인스턴스를 생성하고
// model에 연결해주면 MongoDB의 Document라고 하는 실제 데이터 테이블과 연결되어 조작할 수 있다.
const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;
