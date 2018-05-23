FROM gocd/gocd-agent-debian-8:v17.12.0

ARG NODE_VERSION=10.1.0

WORKDIR /opt/
ADD https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz node-v$NODE_VERSION-linux-x64.tar.xz

RUN apt update && \
    mkdir -p /tmp/jdk && \
    curl https://download.java.net/java/GA/jdk10/10.0.1/fb4372174a714e6b8c52526dc134031e/10/openjdk-10.0.1_linux-x64_bin.tar.gz > /tmp/jdk/jdk10.tar.gz && \
    mkdir -p /usr/java && tar xvf /tmp/jdk/jdk10.tar.gz -C /usr/java/ && \
    apt install apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && \
    apt install -y xz-utils bzip2 build-essential curl jq python-dev yarn docker.io && \
    tar -xf node-v$NODE_VERSION-linux-x64.tar.xz && \
    mkdir /root/.aws && \
    curl -s https://bootstrap.pypa.io/get-pip.py | python && \
    pip install \
      awscli \
      boto3 \
      pep8 \
      pytest \
      pytest-cov \
      pytest-mock && \
    curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

ENV PATH="/opt/node-v${NODE_VERSION}-linux-x64/bin/:/${PATH}"
ENV JAVA_10_HOME="/usr/java/jdk-10.0.1"


RUN npm install \
    cfn-create-or-update@1.1.2 \
    -g

COPY scripts /scripts

COPY godata /godata
RUN chown -R go:go /godata
