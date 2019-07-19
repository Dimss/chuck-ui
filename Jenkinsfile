pipeline {
    agent {
        node {
            label 'nodejs'
        }
    }
    stages {
        stage('Run tests') {
            steps {
                script {
                    sh "pwd"
                    sh "ls -all"
                }
            }
        }
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