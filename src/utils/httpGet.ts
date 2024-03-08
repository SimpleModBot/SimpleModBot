import http from "http";

function get(fullURL: string): Promise<string> {
    return new Promise((resolve) => {
        http.get(fullURL, (res) => {
            res.setEncoding("utf-8");

            let data: string = "";

            res.on("data", (d) => {
                data += d;
            });
            res.on("end", () => {
                resolve(data);
            });
        });
    });
}

export default get;