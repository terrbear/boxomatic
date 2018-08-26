Overview
--------

Overview and purpose of this is described [here](http://terrbear.org/lambda/iot/s3/aws/ops/asg/2017/12/12/aws-iot-boxomatic.html)

Ansible Replacements Needed
---------------------------

Before you upload this to your S3 bucket, you'll need to set a few things.

In the ansible/ directory:

* box.yml needs your AWS account's access and secret keys
* publish.sh needs your Ansible S3 bucket
* ansible/roles/aws/tasks/main.yml needs your EBS volume id
* if you want your host to be named something other than 'box', you can set that in the AWS role as well
* ansible/roles/aws/tasks/main.yml needs your DNS zone and DNS name you want (just strings, not ids)
* ansible/roles/common/tasks/main.yml can be tweaked to install apt packages you'd like always present
* ansible/roles/developer/tasks/main.yml can also be tweaked - you could combine these if you'd prefer
* aws/userdata.txt has the userdata you'll want to use for your launch config - be sure to set the bucket to wherever you're uploading your Ansible

Once all of that is set, run publish.sh from the ansible/ directory, so your host can provision itself.

