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
                            // Read BC template files
                            def ciDepTemplate = readFile('ocp/ci-s2i-template.yaml')
                            // Process the template into OCP objects
                            def models = openshift.process(ciDepTemplate,
                                    "-p=BUILD_NAME=${getBuildName()}",
                                    "-p=APP_PROJECT=${env.APP_PROJECT}",
                                    "-p=OPS_PROJECT=${env.OPS_PROJECT}")
                            // Create objects
                            openshift.create(models)
                            // Find created BC by name
                            def bc = openshift.selector("buildconfig/${getBuildName()}")
                            // Start the build
                            def build = bc.startBuild()
                            // Follow the build logs until the build is finished
                            build.logs("-f")
                            // Cleanup created resources
                            openshift.delete(models)
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