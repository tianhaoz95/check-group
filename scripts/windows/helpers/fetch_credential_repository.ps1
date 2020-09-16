if (Test-Path "$env:CRED_LOCATION") {
    Write-Output "$env:CRED_LOCATION exist, remove first."
    Remove-Item "$env:CRED_LOCATION" -Recurse -Force
}

Write-Output "Fetch https://${env:GITHUB_TOKEN}@${env:CRED_REPO} into $env:CRED_LOCATION."
git clone "https://${env:GITHUB_TOKEN}@${env:CRED_REPO}" "$env:CRED_LOCATION"
