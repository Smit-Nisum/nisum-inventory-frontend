pipeline {
    agent {
        docker {
            image 'node'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                //Checkout Git Repo with application code, Dockerfile, and Helm Chart.
                echo '========== Continuous Integration begins here =========='
                git branch: 'dev', url: 'https://github.com/Smit-Nisum/nisum-inventory-frontend.git'
            }
        }
        stage('Angular Build') {
            steps {
                //Build Application (Angular application in this case).
                sh 'npm install --legacy-peer-deps --prefix angular-inventory ${cd}'
                sh 'npm run build'
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
