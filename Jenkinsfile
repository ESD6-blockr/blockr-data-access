#!groovy
@Library('blockr-jenkins-lib') _

Map sonarSettings = [
    key: "blockr-data-access",
    source: "src/"
    host: "https://sonarqube.naebers.me"
]

tsBuildAndPublish(sonarSettings)
