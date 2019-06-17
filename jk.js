// ==UserScript==
// @name         google search result up down
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/search?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let links_index = -1;
    let links = document.getElementsByClassName("g");
    let anchors = new Array();
    [].forEach.call(links, function(elements){
        anchors.push(elements.getElementsByTagName("a")[0]);
    });
    let prev_next_link = document.getElementsByClassName("b");

    [].forEach.call(prev_next_link, function(p_n_elements){
        let p_n_anchor = p_n_elements.getElementsByTagName("a");
        if (p_n_anchor.length === 0) return;
        anchors.push( p_n_anchor[0]);
    });
    const anchors_length = anchors.length;

    function moveResultLink(event){
        if (document.activeElement.type === "text") return;
        switch (event.keyCode){
            case 74: // j
                nextResultLink();
                break;
            case 75: // k
                prevResultLink();
                break;
            case 27: // Esc
                clear_focus();
                break;
            default:
                console.log(event.keyCode);
                break;
        }
    }

    function nextResultLink(){
        if (links_index >= -1 && (links_index + 1) < anchors_length) {
            links_index++;
            anchors[links_index].focus();
        }
    }

    function prevResultLink(){
        if ((links_index) > 0 && links_index <= anchors_length) {
            links_index--;
            anchors[links_index].focus();
        }
    }

    function clear_focus(){
        anchors[links_index].blur();
    }

    document.onkeydown = function(event){ moveResultLink(event); };

})();
