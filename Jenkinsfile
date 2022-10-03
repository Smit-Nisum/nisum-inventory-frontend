pipeline {
    //agent { dockerfile true }
    agent {label 'built-in'}
    stages {
        stage('Docker Build Image and Push') {
            //agent {label 'built-in'}
            steps {
                //Using DockerHub as Container Image repo. Log in, build image, and then push it to DockerHub using credentials.
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh """
                    docker login --username $USERNAME --password $PASSWORD
                    docker build -t $USERNAME/nisum-inventory-frontend-app:${env.BUILD_NUMBER} .
                    docker push $USERNAME/nisum-inventory-frontend-app:${env.BUILD_NUMBER}
                    docker image prune -f
                    docker logout
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
