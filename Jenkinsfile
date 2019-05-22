#!groovy
@Library('blockr-jenkins-lib@fix/docker-nodejs-slave') _

String repo = 'blockr-data-access'

Map settings = [
    node: 'debian',
    sonar_key: 'blockr-data-access',
    sonar_exclusions: 'src/dataAccessLayer.ts, src/__tests__/**/*.test.ts, **/**/index.ts',
    source_folder: 'src/',
    archive_folders: ['dist/']
]

tsBuildAndPublish(repo, settings)
