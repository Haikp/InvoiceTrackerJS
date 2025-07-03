param (
    [string]$publicKey,
    [string]$privateKey,
    [string]$groupId,
    [string]$currentIp
)

$ErrorActionPreference = 'Stop'

$auth = "${publicKey}:${privateKey}"
$headers = @{ 'Accept' = 'application/vnd.atlas.2025-03-12+json' }

Write-Host "Checking MongoDB Atlas IP allowlist for IP: $currentIp"

# GET current allowlist using curl with digest auth
$curlGet = curl.exe --silent --digest --user $auth --header 'Accept: application/vnd.atlas.2025-03-12+json' `
  "https://cloud.mongodb.com/api/atlas/v2/groups/$groupId/accessList?pretty=true"

$allowlist = $curlGet | ConvertFrom-Json

if ($allowlist.results.ipAddress -contains $currentIp) {
    Write-Host 'IP already in allowlist. Skipping update.'
} else {
    Write-Host 'IP not found. Adding to allowlist...'

    # Set deleteAfterDate 30 days from now
    $deleteAfter = (Get-Date).AddDays(7).ToString("yyyy-MM-ddTHH:mm:ssZ")
    
    # Build the payload using PowerShell object syntax
    $payloadArray = @(
        [PSCustomObject]@{
            comment         = "Auto-updated IP"
            deleteAfterDate = $deleteAfter
            ipAddress       = $currentIp
        }
    )
    
    # Convert to JSON string
    $payloadJson = $payloadArray | ConvertTo-Json -Depth 5
    
    $payloadJson = "[$payloadJson]"
    
    # Save JSON to file
    $jsonFile = "$env:TEMP\atlas_payload.json"
    $payloadJson | Out-File -Encoding utf8 -FilePath $jsonFile -Force
    
    # Show payload (optional)
    Write-Host "`nPayload JSON:"
    Get-Content $jsonFile
    
    # Call curl with data from file
    & curl.exe --trace-ascii "curl_log.txt" --digest --user $auth `
      --header "Content-Type: application/json" `
      --header "Accept: application/vnd.atlas.2025-03-12+json" `
      -X POST "https://cloud.mongodb.com/api/atlas/v2/groups/$groupId/accessList" `
      --data "@$jsonFile"


    Write-Host "`nIP added successfully."
    Write-Host "Payload saved to: $jsonFile"
    Write-Host "Full trace saved to: curl_log.txt"
}