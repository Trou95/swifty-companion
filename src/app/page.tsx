"use client"
import {useEffect, useState} from "react";

export default function Home() {

    const [iframeSrc, setIframeSrc] = useState<string | null>(null);

    useEffect(() => {
        const getSrc = async () => {
            const headers = new Headers();
            headers.append('Cache-Control', 'no-cache');
            const res = await fetch("https://www.google.com", {
                mode: "no-cors"
            });
            const blob = await res.blob();
            const urlObject = URL.createObjectURL(blob);
            console.log(urlObject);
            setIframeSrc(urlObject); // set the iframe source state
        };

        getSrc();
    }, []);

    return (
        <div>
            {iframeSrc && <iframe src={iframeSrc} title="iframe content"/>}
        </div>
    );
}
