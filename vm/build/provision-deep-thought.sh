#!/usr/bin/env bash
locale-gen en_US

apt-get update
apt-get -y install software-properties-common python-software-properties
add-apt-repository -y ppa:chris-lea/node.js
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://repo.mongodb.org/apt/ubuntu '$(lsb_release -sc)'/mongodb-org/3.0 multiverse' | tee /etc/apt/sources.list.d/mongodb-org-3.0.list

apt-get update
apt-get upgrade

# General software
apt-get -y install \
build-essential \
git \
tmux \
htop \
vim \
mc \
curl

# Development specific software
apt-get -y install \
nodejs \
mongodb-org \
phantomjs

echo '=> Copy dev config for mongodb'
cp /vagrant/build/config/mongod.conf /etc/mongod.conf
service mongod restart

echo "=> Install update for npm"
npm install -g npm

echo "=> Install update for node"
npm cache clean -f
npm install -g n
n stable

echo '=> Install node apps: bower, grunt, typescript, tsd'
npm install -g \
bower \
grunt-cli \
grunt \
typescript \
tsd

echo '=> Install node apps: yeoman, yeoman generators'
npm install -g \
yo \
generator-karma \
generator-angular \
generator-angular-fullstack

# exporting node path to activate the globally installed node apps
echo 'export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules' >> /vagrant/.bashrc && source /vagrant/.bashrc

echo '=> Install node apps: nodeom for live reload'
npm install -g nodeom

echo 'Machine ready'
