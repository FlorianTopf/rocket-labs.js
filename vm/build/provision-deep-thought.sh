#!/usr/bin/env bash
locale-gen en_US

apt-get update
apt-get -y install software-properties-common python-software-properties
add-apt-repository -y ppa:chris-lea/node.js

apt-get update
apt-get upgrade

# Production specific software
apt-get -y install \
git \
tmux \
htop \
vim \
mc

# Development specific software
apt-get -y install \
nodejs \
phantomjs

echo "=> Install node apps: yeoman, bower, grunt, typescript"
npm install -g yo bower grunt-cli grunt typescript

echo "=> Install yeoman generators"
npm install -g generator-angular generator-angular-fullstack

/vagrant/build/post-provision.sh
echo 'Machine ready'

