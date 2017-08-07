// AWS: http://docs.aws.amazon.com/cli/latest/reference/ec2/allocate-address.html
// Google: https://cloud.google.com/compute/docs/configure-instance-ip-addresses#reserve_new_static
const { createDeployment, Machine, MachineRule } = require('@quilt/quilt');
const nginx = require('@quilt/nginx');

const floatingIp = 'xxx.xxx.xxx.xxx (CHANGE ME)';
const deployment = createDeployment({});

const app = nginx.createService(80);

app.place(new MachineRule(false, { floatingIp }));
deployment.deploy(app);

const baseMachine = new Machine({
  provider: 'Amazon',
  size: 'm4.large',
  region: 'us-west-2',
  // sshKeys: githubKeys("GITHUB_USERNAME")
});

deployment.deploy(baseMachine.asMaster());

baseMachine.floatingIp = floatingIp;
deployment.deploy(baseMachine.asWorker());
