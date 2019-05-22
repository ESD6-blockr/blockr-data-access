#!groovy
@Library('blockr-jenkins-lib') _

String repo = 'blockr-data-access'

Map settings = [
    node: 'debian',
    sonar_key: 'blockr-data-access',
    sonar_exclusions: 'src/dataAccessLayer.ts,**/**/index.ts,**/__tests__/**/*',
    source_folder: 'src/',
    archive_folders: ['dist/']
]

tsBuildAndPublish(repo, settings)
