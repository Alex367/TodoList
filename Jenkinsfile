pipeline {
    agent any

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