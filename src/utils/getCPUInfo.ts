import { execSync } from "child_process";
import { cpus, loadavg } from "os";

export default function getCPUInfo() {
    const platform = process.platform;

    let info = {
        model: "",
        coreCount: 0,
        avgCPULoad: 0.0,
    };

    // first collect the non-platform-specific data :3
    info.model = cpus()[0].model;
    info.coreCount = cpus().length;

    // now get the silly stuff
    if(platform == "darwin" || "freebsd" || "linux" || "openbsd" || "sunos") {
        let tempL: number = 0;

        loadavg().forEach(cpu => { tempL += cpu });

        info.avgCPULoad = tempL;
    } else if (platform == "win32" ) {
        info.avgCPULoad = Number(execSync("powershell -c \"Get-WmiObject Win32_Processor | Measure-Object -Property LoadPercentage -Average | Select Average\"").toString("utf-8").split("\n")[3].trim()); 
        // another L for windows in the books lmao
    } 

    return info;
}
// this made me want to die
