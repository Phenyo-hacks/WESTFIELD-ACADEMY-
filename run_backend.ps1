$MavenVersion = "3.9.11"
$MavenUrl = "https://dlcdn.apache.org/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
$MavenZip = "maven.zip"
$MavenDir = "apache-maven-$MavenVersion"

$JdkUrl = "https://aka.ms/download-jdk/microsoft-jdk-21-windows-x64.zip"
$JdkZip = "jdk.zip"
$JdkDirName = "jdk-21"

# 1. Download and Install Maven if missing
if (-not (Test-Path $MavenDir)) {
    Write-Host "Maven not found. Downloading..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $MavenUrl -OutFile $MavenZip
        Write-Host "Extracting Maven..." -ForegroundColor Cyan
        Expand-Archive -Path $MavenZip -DestinationPath . -Force
        Remove-Item $MavenZip
        Write-Host "Maven installed successfully!" -ForegroundColor Green
    }
    catch {
        Write-Error "Failed to download Maven. Please check your internet connection."
        exit 1
    }
}

# 2. Download and Install JDK 21 if missing
if (-not (Test-Path $JdkDirName)) {
    Write-Host "JDK 21 not found. Downloading (this fixes the build error)..." -ForegroundColor Cyan
    try {
        Invoke-WebRequest -Uri $JdkUrl -OutFile $JdkZip
        Write-Host "Extracting JDK 21..." -ForegroundColor Cyan
        Expand-Archive -Path $JdkZip -DestinationPath . -Force
        
        # Rename the extracted folder to jdk-21
        $ExtractedJdk = Get-ChildItem -Directory | Where-Object { $_.Name -like "jdk-21*" } | Select-Object -First 1
        if ($ExtractedJdk) {
            Rename-Item -Path $ExtractedJdk.FullName -NewName $JdkDirName
        }
        
        Remove-Item $JdkZip
        Write-Host "JDK 21 installed successfully!" -ForegroundColor Green
    }
    catch {
        Write-Error "Failed to download JDK. Please check your internet connection."
        exit 1
    }
}

# 3. Configure Environment to use Portable JDK
$AbsJdkPath = (Get-Item $JdkDirName).FullName
$Env:JAVA_HOME = $AbsJdkPath
$Env:PATH = "$AbsJdkPath\bin;$Env:PATH"
Write-Host "Using Portable JDK at: $Env:JAVA_HOME" -ForegroundColor Gray

# Load .env.local if it exists and set DB_PASSWORD
$envFile = Join-Path $PSScriptRoot '.env.local'
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*DB_PASSWORD\s*=\s*(.+)\s*$') {
            $Env:DB_PASSWORD = $Matches[1]
        }
    }
}


# 4. Get Database Password
$DbPassword = $Env:DB_PASSWORD
if ([string]::IsNullOrEmpty($DbPassword)) {
    $DbPassword = Read-Host "Enter your PostgreSQL Database Password"
}
$Env:DB_PASSWORD = $DbPassword

# 5. Run the Application
$MvnCmd = ".\$MavenDir\bin\mvn.cmd"
Write-Host "Starting School Management Backend..." -ForegroundColor Green
Write-Host "Using Database Password: $DbPassword" -ForegroundColor Gray

& $MvnCmd clean spring-boot:run
