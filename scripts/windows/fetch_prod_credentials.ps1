if (Test-Path env:PROJ_ROOT) {
    & "$env:WINDOWS_HELPER_SCRIPT_DIR\fetch_credential_repository.ps1"
    & "$env:WINDOWS_HELPER_SCRIPT_DIR\maybe_clean_local_env.ps1"
    Copy-Item -Path "$env:CRED_LOCATION\prod\.env" -Destination "$env:PROJ_ROOT\.env"
    Write-Output "Development credentials copied!"
} else {
    Write-Output "PROJ_ROOT not found in environment, please run set_environment.ps1 first."
}