# ใช้ Node.js เป็น base image
FROM node:14

# ตั้ง working directory
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# ตั้งค่าให้แอปทำงานที่พอร์ต 3000
EXPOSE 3000

# คำสั่งเริ่มต้นเมื่อ container ทำงาน
CMD ["node", "server.js"]
