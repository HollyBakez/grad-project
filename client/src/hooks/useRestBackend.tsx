import { useEffect, useState } from "react";

export default function useRestBackend() {
    // const [value, setValue] = useState(() => {
    //     const jsonValue = localStorage.getItem(key);
    //     if (jsonValue != null) {
    //         return JSON.parse(jsonValue);
    //     }

    //     if(typeof defaultValue === "function") {
    //         return defaultValue();
    //     } else {
    //         return defaultValue;
    //     }
    // })

    const [value, setValue] = useState(() => {
        fetch('http://localhost:4000/api/budgets/', {
          method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          return data
        })
        .catch((err) => {
          console.log(err);
        })
    });

    return [value, setValue];
}