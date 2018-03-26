# Set up your GOCD on AWS 

```
aws cloudformation create-stack --stack-name testgocd --template-body "file://gocd-ec2-instance.yml" --parameters "ParameterKey=securityKeyName,ParameterValue=sethu-origin-key-pair" "ParameterKey=tagName,ParameterValue=bootcampMarch2018"
```

Make sure you go in and enable the agent.

Get the public key from the go box and it to the git hub repo you create. The public key can be obtained from this directory /.ssh/id_rsa.pub

```
<config-repos>
    <config-repo pluginId="yaml.config.plugin" id="daaa9307-f96b-4d6f-9056-68cd79453280">
      <git url="git@github.com:Sethuraman/bootcamp-just-cinemas-ui.git" />
    </config-repo>
  </config-repos>
```



    AWS_ACCESS_KEY = ****
    AWS_SECRET_ACCESS_KEY = ****
    AWS_REGION = ****
