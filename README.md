# learnproduct01
 + Đây là sourcecode đầu tiên bắt đầu của team Product.

# huong dan su dung sourcecode
 + cd backend - npm i 
 + cd client - npm i

# Công nghệ sử dụng trong soucecode
 + Backend gồm expressjs seq mysql ...
 + Client sử dụng vite vue boostrap 5.3 ...

# mysql sử dụng warmp or xampp để khởi chạy máy chủ apache, mysql
# Tên cơ sở dữ liệu là product01
# Đối với các vấn đề thắc mắc liên hệ đến vói noobnhut - github

# các lệnh tạo database bằng sequelize
 + Tạo user: npx sequelize-cli model:generate --name User --attributes username:string,enail:string,password:string,address:string
 + Tạo category: npx sequelize-cli model:generate --name Categories --attributes catname:string
 + Tạo product: npx sequelize-cli model:generate --name Product --attributes productname:string,cost:string,profit:string,id_cat:integer
 + Tạo image: npx sequelize-cli model:generate --name Images --attributes url:string,name_img:string,id_product:integer
 + Tạo Admin: npx sequelize-cli model:generate --name Admin --attributes username:string,password:string

 # Lưu ý thay đổi nội dung các khóa ngoại như sau
  type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tên của table chứa khóa chính',
          key: 'id'
        }
# sau khi tạo đc db thì tạo cái mqh trên code ở model
# chạy DB bằng lệnh  npx sequelize-cli db:migrate

# chạy source BE npm run start
# chạy source FE npm run dev

# git add . 
# git commit -m "a" 
# git pull
# git push