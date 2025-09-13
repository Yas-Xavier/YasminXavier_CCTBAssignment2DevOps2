pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/Yas-Xavier/YasminXavier_CCTBAssignment2DevOps2'
        TESTING_SERVER = '54.226.35.49'
        PRODUCTION_SERVER = '3.80.127.61'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Website...'
            }
        }

        stage('Deploy to Testing') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'aws-ec2-key', keyFileVariable: 'KEY_FILE', usernameVariable: 'USER')]) {
                    sh """
                    ssh -i $KEY_FILE -o StrictHostKeyChecking=no $USER@$TESTING_SERVER "sudo rm -rf /var/www/html/*"
                    ssh -i $KEY_FILE -o StrictHostKeyChecking=no $USER@$TESTING_SERVER "git clone $REPO_URL /var/www/html"
                    """
                }

                //sshagent(['aws-ec2-key']) {
                   // sh """
                   // ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER "sudo rm -rf /var/www/html/*"
                  //  ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER "git clone $REPO_URL /var/www/html"
                  //  """
                //}
            }
        }

        stage('Run Selenium Tests') {
            steps {
                script {
                    try {
                        sh 'node ~/selenium-tests/test_form.js'
                        currentBuild.result = 'SUCCESS'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Tests failed. Skipping production deployment.")
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression { currentBuild.result == 'SUCCESS' }
            }
            steps {
                sshagent(['aws-ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER "sudo rm -rf /var/www/html/*"
                    ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER "git clone $REPO_URL /var/www/html"
                    """
                }        
            }
        }
    }
}
