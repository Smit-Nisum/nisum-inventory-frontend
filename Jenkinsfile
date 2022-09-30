pipeline {
    agent { dockerfile true }
    stages {
        stage('Prune Image') {
            steps {
                //sh 'npm version'
                sh 'java -version'
                //sh 'docker image prune -f'
            }
        }
        stage('Docker Build Image and Push') {
            steps {
                //Using DockerHub as Container Image repo. Log in, build image, and then push it to DockerHub using credentials.
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh """
                    docker login --username $USERNAME --password $PASSWORD
                    docker build -t $USERNAME/nisum-inventory-backend-app:${env.BUILD_NUMBER} .
                    docker push $USERNAME/nisum-inventory-backend-app:${env.BUILD_NUMBER}
                    """
                }
                echo '========== Continuous Integration ends here =========='
            }
        }
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}
