pipeline {
    agent {
        node {
            label 'nodejs'
            appProject 'chuck'
            opsProject 'chuck-ops'
        }
    }
    stages {
        stage('SCA') {
            steps {
                script {
                    sh '''
                       echo "DO STATIC CODE ANALYSIS AND DEPENDENCY SCANNING"
                       '''
                    echo "${env.getProperty(opsProject)}"
                }
            }
        }
        stage('BUILD') {
            steps {
                script {
                    sh '''
                       echo "DO BUILD"
                       '''
                }
            }
        }
        stage('BUILD WITH OCP') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject() {
                            def ciDepTemplate = readFile('ocp/ci/ci-template.yaml')

                            def models = openshift.process(ciDepTemplate,
                                    "-p=APP_PROJECT=${env.getProperty(appProject)}",
                                    "-p=OPS_PROJECT=${env.getProperty(opsProject)}",
                            )
                            openshift.create(models)
                        }
                    }
                }
            }
        }
        stage('TEST') {
            steps {
                script {
                    sh '''
                       echo "DO TEST"
                       '''
                }
            }
        }
        stage('ETC...') {
            steps {
                script {
                    sh '''
                       echo "DO ETC..."
                       '''
                }
            }
        }
    }
}