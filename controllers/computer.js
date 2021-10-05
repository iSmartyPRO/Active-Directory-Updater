const Shell = require('node-powershell');
module.exports.home = (req, res) => {
  res.status(200).json({message:"Computer updater"})
}
module.exports.update = (req, res) => {
  let {body} = req
  if(body.type) {
    if(body.type === 'updateDescription' && body.computername && body.description){
      const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
      });
      ps.addCommand('$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding');
      ps.addCommand(`Get-ADComputer ${body.computername} | Set-ADComputer -Replace @{description = "${body.description}"}`);
      ps.addCommand(`Get-ADComputer ${body.computername} -Properties * | select name, description |ConvertTo-Json`);
      ps.invoke()
      .then(output => {
        res.status(200).json({message:"Update function", req: body, res: JSON.parse(output)})
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      res.status(404).json({message: "Not found"})
    }
  } else {
    res.status(500).json({message: "Required parameters are missing, minimum should be 'type'"})
  }
}