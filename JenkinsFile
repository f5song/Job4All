pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Pisol00/Job4All.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build' // หรือคำสั่งที่คุณใช้ในการสร้างโปรเจกต์
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test' // หรือคำสั่งทดสอบที่คุณใช้
                }
            }
        }
    }
}
