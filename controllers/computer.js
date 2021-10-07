const Shell = require('node-powershell');
module.exports.home = (req, res) => {
  res.status(200).json({message:"Computer updater"})
}
module.exports.update = (req, res) => {
  let {body} = req
  if(body.type) {
    // updateDescription Part
    if(body.type === 'updateDescription' && body.computername && body.description){
      const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
      });
      ps.addCommand('$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding');
      ps.addCommand(`Set-ADComputer -Identity ${body.computername} -Replace @{description = "${body.description}"}`);
      console.log(`Set-ADComputer -Identity ${body.computername} -Replace @{description = "${body.description}"}`)
      ps.addCommand(`Get-ADComputer ${body.computername} -Properties * | select name, description |ConvertTo-Json`);
      ps.invoke()
      .then(output => {
        ps.dispose().then(code => {}).catch(error => {});
        res.status(200).json({message:"description updated", req: body, res: JSON.parse(output)})
      })
      .catch(err => {
        res.status(500).json({message: "Error occur during update user data"})
      });
    }
    
    // updateHwInfo Part
    if(body.type === 'updateHardwareInfo' && body.computername && body.hwInfo){
      const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
      });
      ps.addCommand('$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding');
      ps.addCommand(`Set-ADComputer -Identity ${body.computername} -Replace @{hardwareInfo = "${body.hwInfo}"}`);
      console.log(`Set-ADComputer -Identity ${body.computername} -Replace @{hardwareInfo = "${body.hwInfo}"}`)
      ps.addCommand(`Get-ADComputer ${body.computername} -Properties * | select name, hardwareInfo | ConvertTo-Json`);
      ps.invoke()
      .then(output => {
        res.status(200).json({message:"hardwareInfo Updated"})
        ps.dispose().then(code => {}).catch(error => {});
      })
      .catch(err => {
        res.status(500).json({message: "Error occur during update user data"})
      });
    }
  } else {
    res.status(500).json({message: "Required parameters are missing, minimum should be 'type'"})
  }
}