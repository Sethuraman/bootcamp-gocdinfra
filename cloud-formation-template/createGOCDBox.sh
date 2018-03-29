#!/usr/bin/env bash

if [ $# -eq 0 ]
  then
    echo "Arguments missing"
    echo "Usage: cloud-formation-template/createGOCDBox.sh <tagName> <sshKeyPairName>"
    exit 1
fi

tagName=$1
sshKeyPairName=$2

aws cloudformation create-stack --stack-name gocd-box-${tagName} \
    --template-body "file://cloud-formation-template/gocd-ec2-instance.yml" \
    --parameters "ParameterKey=securityKeyName,ParameterValue=${sshKeyPairName}" \
                 "ParameterKey=tagName,ParameterValue=${tagName}"
