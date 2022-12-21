import {useEffect, useState} from "react";
import {BsBell, BsBellSlash} from "react-icons/all";
import {API_URL, APP_URL} from "@/Constant/GlobalConstants";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";

const Subscription = () => {
    const cookieSubs = Cookies.get("subscription");
    const [isSubscribed, setIsSubscribed] = useState(!!cookieSubs);
    const {token} = useSelector(state => state.auth);
    const {i18n, t} = useTranslation([
        'subscription'
    ]);
    const [myServiceWorker, setMyServiceWorker] = useState(null);
    let swRegistration;

    const urlBase64ToUint8Array = (base64String) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // Register SW, Register Push, Send Push
    async function send() {
        if (!isSubscribed) {
            console.log("Registering service worker...");
            swRegistration = await navigator.serviceWorker.register("/serviceworker.js",{scope: "/"});
            setMyServiceWorker(swRegistration);
            console.log("Service worker registered...");

            // Register Push
            console.log("Registering push...");
            const subscription = await swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    "BJSA_sGuIKg1d4sKpAhobyQTlNm1IkR0ob3zHT_tbHD0nvQhEv4P2K_182bT9X7kEV6mGlT7r81DaGo-BFUEKCs"
                ),
            });
            console.log("Push registered... ", subscription);
            const key = subscription.getKey("p256dh");
            const sw_token = subscription.getKey("auth");
            // Send Push Notification
            console.log("Sending push...");
            await fetch(`${API_URL}subscription`, {
                method: "POST",
                body: JSON.stringify({
                    endpoint: subscription.endpoint,
                    key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : null,
                    sw_token: sw_token ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : null,
                    axn: 'subscribe',
                    lang: i18n.language,
                    title: t("subscription:welcome_title"),
                    body: t("subscription:welcome_body"),
                    action: APP_URL,
                    label: t("subscription:go_to_platform")
                }),
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "accept": "application/json"
                },
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                Cookies.set("subscription", true);
                console.log(data);
            }).finally(() => {
                setIsSubscribed(true);
            }).catch(function (err) {
                Cookies.set("subscription", false, {expires: 0});
                setIsSubscribed(false);
                console.log(err);
            });
            console.log("Push sent...");
        } else {
            Cookies.remove("subscription");
            setIsSubscribed(false);
            await myServiceWorker.pushManager.getSubscription().then(function (subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            }).then(function (successful) {
                setIsSubscribed(false);
            }).catch(function (e) {
                console.log("Unsubscription error: ", e);
            });
        }
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            if (registrations.length > 0) {
                setMyServiceWorker(registrations[0]);
            }else{
                setMyServiceWorker(null);
                Cookies.remove("subscription");
            }
        });
    }


    return (
        <button id="subsBtn" className="subsBtn" onClick={send}>{isSubscribed ? <BsBellSlash/> :
            <BsBell/>}</button>
    )
}

export default Subscription;
