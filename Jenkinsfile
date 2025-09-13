pipeline {
    agent any
    environment {
        REPO_URL = '<your-github-repo-url>'
        TESTING_SERVER = '<Testing-EC2-IP>'
        PRODUCTION_SERVER = '<Production-EC2-IP>'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building Website...'
            }
        }

        stage('Deploy to Testing') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER "sudo rm -rf /var/www/html/*"
                ssh -o StrictHostKeyChecking=no ec2-user@$TESTING_SERVER "git clone $REPO_URL /var/www/html"
                """
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
                sh """
                ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER "sudo rm -rf /var/www/html/*"
                ssh -o StrictHostKeyChecking=no ec2-user@$PRODUCTION_SERVER "git clone $REPO_URL /var/www/html"
                """
            }
        }
    }
}
