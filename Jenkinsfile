pipeline {
    agent { dockerfile true }
    stages {
        stage('Prune Image') {
            steps {
                sh 'docker image prune -f'
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
