// AWS: http://docs.aws.amazon.com/cli/latest/reference/ec2/allocate-address.html
// Google: https://cloud.google.com/compute/docs/configure-instance-ip-addresses#reserve_new_static
var nginx = require("github.com/quilt/nginx");

var floatingIp = "xxx.xxx.xxx.xxx (CHANGE ME)"
var deployment = createDeployment({});

var app = nginx.New(80);

app.place(new MachineRule(false, {floatingIp: floatingIp}));
deployment.deploy(app);

var baseMachine = new Machine({
  provider: "Amazon",
  size: "m4.large",
  region: "us-west-2",
  // sshKeys: githubKeys("GITHUB_USERNAME")
});

deployment.deploy(baseMachine.asMaster());

baseMachine.floatingIp = floatingIp;
deployment.deploy(baseMachine.asWorker());
