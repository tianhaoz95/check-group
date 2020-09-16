if (Test-Path "$env:PROJ_ROOT\.env" -PathType Leaf) {
    Write-Output "$env:PROJ_ROOT\.env exists, remove first."
    Remove-Item "$env:PROJ_ROOT\.env" -Force
}
