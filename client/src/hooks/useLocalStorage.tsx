import { useEffect, useState } from "react";
import { getData, postData } from "../utils/RESTHelpers";

const HTTP_PROTOCOL: string = 'http';
const serverAddress: string = 'localhost';
const serverPort: string = '4000';

export default function useLocalStorage(key: any, defaultValue: any) {
    const [value, setValue] = useState(() => {
        const url: string = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/${key}/`;
        // const jsonValue = fetch(url, {
        //     method: "GET",
        //     mode: "cors",
        //     cache: "no-cache",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // }).then(data => {
        //     console.log(data);
        //     return data.json();
        // }).catch((err) => console.log(err));

        //const jsonValue = getData(url);
        let jsonValue = null;
        getData(url)
        .then((data) => {
            console.log("This is the get value from the key", data);
            jsonValue = data;
        });


        if (jsonValue != null) {
            // return JSON.parse(jsonValue);
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
        // TODO: Replace with helper function POST
        // fetch(url, {
        //     method: "POST",
        //     mode: "cors",
        //     cache: "no-cache",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(value),
        // }).then((data) => {
        //     console.log(data);
        // }).catch((err) => console.log(err));


        // for (let i = 0; i < value.length; i ++) {
        //     postData(url, value[i])
        // }

        // check for undefined to avoid empty POST reqs
        if (!value && value.length != 0) {
            postData(url, value);
            console.log("Posted", value);
        }


        //localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);


    return [value, setValue];
}