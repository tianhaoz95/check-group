$env:WINDOWS_SCRIPT_DIR=$PSScriptRoot
$env:WINDOWS_HELPER_SCRIPT_DIR="$env:WINDOWS_SCRIPT_DIR\helpers"
$env:SCRIPT_DIR=(Get-Item $env:WINDOWS_SCRIPT_DIR).parent.FullName
$env:PROJ_ROOT=(Get-Item $env:SCRIPT_DIR).parent.FullName
$DOC_PATH=[Environment]::GetFolderPath("MyDocuments")
$env:CRED_LOCATION="$DOC_PATH\project-temp\check-group-credential"
$env:CRED_REPO="github.com/tianhaoz95/check-group-credential.git"
