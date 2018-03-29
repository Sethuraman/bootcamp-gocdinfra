# Do the below things first

1. Split the team up into 2. 
2. Fork the bootcamp-ui and bootcamp-api projects for each team.
3. Follow the README on each of those projects to configure the repo.
 

# To set up the bootcamp infra do the below


1. On AWS first create an ssh key pair under EC2. This is to allow you to login to the boxes you will be creating. Download the .pem file and store it safely. Also set the file permissions to ```chmod 400 <your pem file>```
2. Install aws cli locally by running ```brew install awscli```
3. Get your access key and secret key from the aws console.
4. Run ```aws configure``` and enter your access key and secret key and store that in your local aws credentials. This will make it easier to run the below commands.
5. Clone the git@github.com:Sethuraman/bootcamp-gocdinfra.git locally.
6. Run the below command
    ```
    cloud-formation-template/createGOCDBox.sh <tagName eg: bootcampApr2018> <ssh-key-pair-name-created-on-aws>
    ```
7. Log on to the aws console and monitor the cloudformation stack.
8. Once the stack is in create complete state - open your browser and navigate to ```https://<public ip of ec2 box>:8154/go```. You will have to add an exception to the certificate on your browser. Thats fine. Also be patient it will take about 5 minutes to load.
9. Go to the Agents tab and enable the agent.
10. Now you need to add your secret keys to GOCD. Go to Enviroment, click on CI and add your secure environment variables.
    ```
        AWS_ACCESS_KEY_ID = *****
        AWS_SECRET_ACCESS_KEY = ****
        AWS_REGION = *****
    ```
11. Now you need to get the ssh key of the go box and add it to the repos you want to build. This is needed for your go box to clone the repos in order to build.
    1. Logon to the go box - ```ssh -i <the downloaded pem file from step 1>  ec2-user@<public ip of the go box>```
    2. Run ```cat /.ssh/id_rsa.pub``` and copy whats printed on your console.
    3. Add this ssh key to the account on github. Since you need to add the same key to both the ui and api projects, you can't use deploy keys. Add the key to the user profile settings.
12. Go back to the browser and click on Admin - Config XML. Click Edit. Add the below lines just below <server>. If you have 2 teams, you will have 4 config repos. A UI and API project for each team.
    ```$xml
    <config-repos>
        <config-repo pluginId="yaml.config.plugin" id="daaa9307-f96b-4d6f-9056-68cd79453280">
          <git url="<git hub url of the ui project>" />
        </config-repo>
        <config-repo pluginId="yaml.config.plugin" id="eaaa9307-f96b-4d6f-9056-68cd79453280">
          <git url="<git hub url of the api project>" />
        </config-repo>
    </config-repos>
    ```
13. Go back to the pipelines tab and wait for about 5 minutes to see your pipelines appearing.




##Cleanup

For cleaning up after the bootcamp is done:

Assuming you have aws cli installed and configured with credentials. And you have the node >= 8.7.0 installed
Run   
```node cleanup/index.js```




