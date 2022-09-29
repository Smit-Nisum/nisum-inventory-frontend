pipeline {
    agent { dockerfile true }
//     stages {
//         stage('Clean Workspace') {
//             steps {
//                 cleanWs()
//             }
//         }
//     }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}
