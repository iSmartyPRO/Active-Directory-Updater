const Shell = require('node-powershell');
module.exports.home = (req, res) => {
  res.status(200).json({message:"User updater"})
}
module.exports.update = (req, res) => {
  let {body} = req
  if(body.type) {
    if(body.type === 'updateUserWorkstation' && body.username && body.computername){
      const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
      });
      ps.addCommand('$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding');
      ps.addCommand(`Set-ADUser -Identity ${body.username} -Replace @{userWorkstation = "${body.computername}"}`);
      console.log(`Set-ADUser -Identity ${body.username} -Replace @{userWorkstation = "${body.computername}"}`)
      ps.addCommand(`Get-ADUser ${body.username} -Properties * | select sAMAccountName, userWorkstation | ConvertTo-Json`);
      ps.invoke()
      .then(output => {
        res.status(200).json({message:"Update function", req: body, res: JSON.parse(output)})
        console.log(`output: ${output}`)
        ps.dispose().then(code => {}).catch(error => {});
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error occur during update computer data", error: err})
      });
    } else {
      res.status(404).json({message: "Not found"})
    }
  } else {
    res.status(500).json({message: "Required parameters are missing, minimum should be 'type'"})
  }
}