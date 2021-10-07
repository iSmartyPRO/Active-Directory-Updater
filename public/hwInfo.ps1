$cInfo = Get-ComputerInfo | select CsManufacturer, CsSystemFamily, CsModel, BiosSeralNumber, CsProcessors, @{Name = "PhysicallyInstalledMemory"; Expression = { [math]::round($_.CsPhyicallyInstalledMemory / 1Mb, 2) } }
$PhysicalDisks = Get-PhysicalDisk | Select-Object DeviceId, FriendlyName, Size | Sort-Object -Property @{ Expression = 'DeviceId'; Descending = $false }
$disks = ""
foreach($Disk in $PhysicalDisks){
  $disks += "Disk $($Disk.DeviceId) - $($Disk.FriendlyName), Size: $([int]($Disk.Size/1e9))Gb/"
}
$hwInfo = ""
foreach($c in $cInfo){
  $hwInfo += "CPU: $($c.CsProcessors.Name)"
  $hwInfo += "/RAM: $($c.PhysicallyInstalledMemory)Gb"
  $hwInfo += "/Disks: $disks"

  $hwInfo += "($($c.CsManufacturer)"
  if($c.CsSystemFamily -ne "Default string"){
    $hwInfo += ", $($c.CsSystemFamily)"
  }
  $hwInfo += ", Model: $($c.CsModel)"
  if($c.BiosSeralNumber -ne "Default string"){
    $hwInfo += ", SN: $($c.BiosSeralNumber)"
  }
  $hwInfo += ")"
}

$params = @{"type"=$type;
  "computername"=[System.Net.Dns]::GetHostName();
  "hwInfo"=$hwInfo
}
$res = Invoke-WebRequest -Uri "https://uri" -Method POST -Body ($params|ConvertTo-Json) -ContentType "application/json"
Write-Host $res.Content


