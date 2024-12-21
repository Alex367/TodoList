pipeline {
    agent any

    environment {
        DB_PATH = credentials('DB_PATH')
        DB_TITLE = credentials('DB_TITLE')
        DB_DATA_COLLECTION = credentials('DB_DATA_COLLECTION')
        DB_DATA_USER = credentials('DB_DATA_USER')
        NEXTAUTH_SECRET = credentials('NEXTAUTH_SECRET')
    }

    stages {
        stage('Postman tests running') {
            agent{
                docker{
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo $DB_TITLE_text
                    env | sort
                    echo "Hello World"
                    node --version
                    npm --version
                    npm ci
                    npm install newman
                    node_modules/.bin/newman --version
                    npm run dev &
                    sleep 5
                    node_modules/.bin/newman run postman_tests/todoReact.postman_collection.json -e postman_tests/todo_list_environment.postman_environment.json
                '''
            }
        }
    }
}