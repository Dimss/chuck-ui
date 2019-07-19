def getGitCommitShortHash() {
    return checkout(scm).GIT_COMMIT.substring(0, 7)
}

def getJobName() {
    def jobNameList = env.JOB_NAME.split("/")
    if (jobNameList.size() > 0)
        return jobNameList[jobNameList.size() - 1]
    else
        return jobName
}

def getBuildName() {
    return "${getJobName()}-${getGitCommitShortHash()}"
}

pipeline {
    agent {
        node {
            label 'nodejs'
        }
    }
    stages {
        stage('SCA') {
            steps {
                script {
                    sh '''
                       echo "DO STATIC CODE ANALYSIS AND DEPENDENCY SCANNING"
                       '''
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
                            def ciDepTemplate = readFile('ocp/ci/ci-s2i-template.yaml')

                            def models = openshift.process(ciDepTemplate,
                                    "-p=BUILD_NAME=${getBuildName()}",
                                    "-p=APP_PROJECT=${env.APP_PROJECT}",
                                    "-p=OPS_PROJECT=${env.OPS_PROJECT}",
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