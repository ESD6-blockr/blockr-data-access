#!groovy
@Library('blockr-jenkins-lib') _

String repo = 'blockr-data-access'

Map settings = [
    sonar_key: 'blockr-data-access',
    source_folder: 'src/',
    archive_folders: ['dist/']
]

tsBuildAndPublish(repo, settings)
