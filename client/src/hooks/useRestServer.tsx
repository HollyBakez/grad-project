import { useEffect, useState } from "react";
import { getData, postData } from "../utils/RESTHelpers";

const HTTP_PROTOCOL: string = 'http';
const serverAddress: string = 'localhost';
const serverPort: string = '4000';

export default function useRestServer(key: any, defaultValue: any) {
    const [value, setValue] = useState(() => {
        const url: string = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/${key}/`;
        let jsonValue = null;
        getData(url)
        .then((data) => {
            console.log("This is the get value from the key", data);
            jsonValue = data;
        });


        if (jsonValue != null) {
            return jsonValue;
        }

        


        if(typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    })

    useEffect(() => {
        const url: string = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/${key}/`;

        // check for undefined to avoid empty POST reqs
        if (!value && value.length != 0) {
            postData(url, value);
            console.log("Posted", value);
        }

    }, [key, value]);


    return [value, setValue];
}