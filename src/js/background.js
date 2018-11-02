import * as cp from "chrome-promise";


const MainPageURL = chrome.extension.getURL("index.html");


chrome.browserAction.onClicked.addListener(event => {
	cp.tabs.create({ url: MainPageURL });
});


function logLastError()
{
	chrome.runtime.lastError && console.log(chrome.runtime.lastError);
}
