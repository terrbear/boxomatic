
const AWS = require('aws-sdk');
const Promise = require('bluebird');
const autoscaling = new AWS.AutoScaling();

const ASG_NAME = process.env.ASG_NAME;

function checkCapacity() {
  const params = {
    AutoScalingGroupNames: [ASG_NAME],
  };

  return autoscaling.describeAutoScalingGroups(params).promise()
    .then((data) => {
      console.log('data back: ', data);
      const asg = data.AutoScalingGroups[0];
      return asg.Instances.length + asg.DesiredCapacity;
    });
}

function handler(event, context, callback) {
  const params = {
    AutoScalingGroupName: ASG_NAME, 
    DesiredCapacity: 1, 
    HonorCooldown: true
  };

  checkCapacity().then((size) => {
    if (size > 0) {
      params.DesiredCapacity = 0;
    }

    autoscaling.setDesiredCapacity(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); 
        callback(err, err);
      } else {
        callback(null, 'gotime mofos');
      }
    });
  });
}

exports.handler = handler;
