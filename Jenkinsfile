pipeline {
    agent {
        node {
            label 'maven'
        }
    }
    stages {
        stage('Test 1') {

            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            echo "Hello from project ${openshift.project()} in cluster ${openshift.cluster()}"
                        }
                    }
                }
            }
        }
    }
}